import fs from "fs";
import lighthouse from "lighthouse";
import puppeteer from "puppeteer";

const runAudit = async (targetUrl: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--remote-debugging-port=9222"],
  });
  const result = await lighthouse(targetUrl, {
    port: 9222,
    output: "json",
    formFactor: "desktop",
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      disabled: false,
    },
  });

  if (!result) {
    console.error("No result");
  }
  const lhr = result?.lhr;
  if (!lhr) return;

  delete lhr.audits?.["screenshot-thumbnails"];
  delete lhr.audits?.["final-screenshot"];
  delete lhr.audits?.["full-page-screenshot"];
  delete lhr.categoryGroups;
  // delete lhr.configSettings;
  delete lhr.entities;
  // delete lhr.i18n;
  // delete lhr.timing;
  const lhrJson = JSON.stringify(lhr) || "{}";
  fs.writeFileSync("tmp/lhr.json", lhrJson);

  const myReport = {};
  myReport["performance"] = lhr.categories["performance"].score;
  myReport["seo"] = lhr.categories["seo"].score;
  myReport["accessibility"] = lhr.categories["accessibility"].score;
  myReport["best-practices"] = lhr.categories["best-practices"].score;
  myReport["first-contentful-paint"] =
    lhr.audits["first-contentful-paint"].displayValue;
  console.log(myReport);
  fs.writeFileSync("tmp/my-report.json", JSON.stringify(lhrJson, null, 2));
  await browser.close();
};
const url = process.argv[2];
console.log("Auditing " + url);
runAudit(url);
