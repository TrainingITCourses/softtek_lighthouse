import fs from "fs";
import type { Result } from "lighthouse";
import lighthouse from "lighthouse";
import puppeteer from "puppeteer";
import { getKeyMetrics } from "./key-metrics.ts";
import { getScores } from "./scores.ts";

const port = 9222;
const screenEmulation = {
  mobile: false,
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
  disabled: false,
};
const runAudit = async (targetUrl: string) => {
  console.log(`🔍 Opening browser for: ${targetUrl}`);
  const browser = await puppeteer.launch({
    headless: true,
    args: [`--remote-debugging-port=${port}`],
  });

  console.log(`⏳ Running audit...`);
  const result = await lighthouse(targetUrl, {
    port,
    output: "json",
    formFactor: "desktop",
    disableFullPageScreenshot: true,
    screenEmulation,
  });

  if (!result || !result.lhr) {
    console.error("❌ Lighthouse result is undefined");
    await browser.close();
    return;
  }
  const lhr: Partial<Result> = result.lhr;

  // Remove screenshots and other unnecessary data from the report
  delete lhr.audits?.["screenshot-thumbnails"];
  delete lhr.audits?.["final-screenshot"];
  delete lhr.audits?.["full-page-screenshot"];
  delete lhr.categoryGroups;
  delete lhr.configSettings;
  delete lhr.entities;
  delete lhr.i18n;
  delete lhr.timing;

  const reportPath = `tmp/${targetUrl.replace(/[^a-zA-Z0-9]/g, "-")}.json`;
  console.log(`📗 Writing report... ${reportPath}`);
  fs.writeFileSync(reportPath, JSON.stringify(lhr, null, 2), {
    encoding: "utf-8",
  });
  if (!lhr.categories) {
    console.error("❌ Lighthouse categories are undefined");
    await browser.close();
    return;
  }
  console.group(`📄 Scores:`);
  const scores = getScores(lhr.categories);

  for (const [key, value] of Object.entries(scores)) {
    if (value.score < value.threshold) {
      console.error(
        `❌ ${key.toUpperCase()}: ${value.score} < ${value.threshold}`
      );
    } else {
      console.log(
        `✅ ${key.toUpperCase()}: ${value.score} > ${value.threshold}`
      );
    }
  }
  console.groupEnd();

  if (!lhr.audits) {
    console.error("❌ Lighthouse audits are undefined");
    await browser.close();
    return;
  }
  console.group(`📄 Key metrics:`);
  const keyMetrics = getKeyMetrics(lhr.audits);
  for (const [key, value] of Object.entries(keyMetrics)) {
    console.log(`🚀 ${key.toUpperCase()}: ${value}`);
  }
  console.groupEnd();
  console.log(`🤗 Closing browser...`);
  await browser.close();
};

const url = process.argv[2];
if (!url) {
  console.error(
    "⚠️ Provide a URL as argument. npm start https://www.google.com"
  );
  process.exit(1);
}

runAudit(url).catch((err) => {
  console.error("Error running Lighthouse:", err);
  process.exit(1);
});
