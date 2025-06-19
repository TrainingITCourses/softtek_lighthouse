// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import fs from "fs";
import type { Result } from "lighthouse";
import lighthouse from "lighthouse";
import puppeteer from "puppeteer";
import { getKeyMetrics } from "./key-metrics.ts";
import { getScores } from "./scores.ts";
const port = 9222;
const screenEmulation = stryMutAct_9fa48("15") ? {} : (stryCov_9fa48("15"), {
  mobile: stryMutAct_9fa48("16") ? true : (stryCov_9fa48("16"), false),
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
  disabled: stryMutAct_9fa48("17") ? true : (stryCov_9fa48("17"), false)
});
const runAudit = async (targetUrl: string) => {
  if (stryMutAct_9fa48("18")) {
    {}
  } else {
    stryCov_9fa48("18");
    console.log(stryMutAct_9fa48("19") ? `` : (stryCov_9fa48("19"), `🔍 Opening browser for: ${targetUrl}`));
    const browser = await puppeteer.launch(stryMutAct_9fa48("20") ? {} : (stryCov_9fa48("20"), {
      headless: stryMutAct_9fa48("21") ? false : (stryCov_9fa48("21"), true),
      args: stryMutAct_9fa48("22") ? [] : (stryCov_9fa48("22"), [stryMutAct_9fa48("23") ? `` : (stryCov_9fa48("23"), `--remote-debugging-port=${port}`)])
    }));
    console.log(stryMutAct_9fa48("24") ? `` : (stryCov_9fa48("24"), `⏳ Running audit...`));
    const result = await lighthouse(targetUrl, stryMutAct_9fa48("25") ? {} : (stryCov_9fa48("25"), {
      port,
      output: stryMutAct_9fa48("26") ? "" : (stryCov_9fa48("26"), "json"),
      formFactor: stryMutAct_9fa48("27") ? "" : (stryCov_9fa48("27"), "desktop"),
      disableFullPageScreenshot: stryMutAct_9fa48("28") ? false : (stryCov_9fa48("28"), true),
      screenEmulation
    }));
    if (stryMutAct_9fa48("31") ? !result && !result.lhr : stryMutAct_9fa48("30") ? false : stryMutAct_9fa48("29") ? true : (stryCov_9fa48("29", "30", "31"), (stryMutAct_9fa48("32") ? result : (stryCov_9fa48("32"), !result)) || (stryMutAct_9fa48("33") ? result.lhr : (stryCov_9fa48("33"), !result.lhr)))) {
      if (stryMutAct_9fa48("34")) {
        {}
      } else {
        stryCov_9fa48("34");
        console.error(stryMutAct_9fa48("35") ? "" : (stryCov_9fa48("35"), "❌ Lighthouse result is undefined"));
        await browser.close();
        return;
      }
    }
    const lhr: Partial<Result> = result.lhr;

    // Remove screenshots and other unnecessary data from the report
    stryMutAct_9fa48("36") ? delete lhr.audits["screenshot-thumbnails"] : (stryCov_9fa48("36"), delete lhr.audits?.[stryMutAct_9fa48("37") ? "" : (stryCov_9fa48("37"), "screenshot-thumbnails")]);
    stryMutAct_9fa48("38") ? delete lhr.audits["final-screenshot"] : (stryCov_9fa48("38"), delete lhr.audits?.[stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), "final-screenshot")]);
    stryMutAct_9fa48("40") ? delete lhr.audits["full-page-screenshot"] : (stryCov_9fa48("40"), delete lhr.audits?.[stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), "full-page-screenshot")]);
    delete lhr.categoryGroups;
    delete lhr.configSettings;
    delete lhr.entities;
    delete lhr.i18n;
    delete lhr.timing;
    const reportPath = stryMutAct_9fa48("42") ? `` : (stryCov_9fa48("42"), `tmp/${targetUrl.replace(stryMutAct_9fa48("43") ? /[a-zA-Z0-9]/g : (stryCov_9fa48("43"), /[^a-zA-Z0-9]/g), stryMutAct_9fa48("44") ? "" : (stryCov_9fa48("44"), "-"))}.json`);
    console.log(stryMutAct_9fa48("45") ? `` : (stryCov_9fa48("45"), `📗 Writing report... ${reportPath}`));
    fs.writeFileSync(reportPath, JSON.stringify(lhr, null, 2), stryMutAct_9fa48("46") ? {} : (stryCov_9fa48("46"), {
      encoding: stryMutAct_9fa48("47") ? "" : (stryCov_9fa48("47"), "utf-8")
    }));
    if (stryMutAct_9fa48("50") ? false : stryMutAct_9fa48("49") ? true : stryMutAct_9fa48("48") ? lhr.categories : (stryCov_9fa48("48", "49", "50"), !lhr.categories)) {
      if (stryMutAct_9fa48("51")) {
        {}
      } else {
        stryCov_9fa48("51");
        console.error(stryMutAct_9fa48("52") ? "" : (stryCov_9fa48("52"), "❌ Lighthouse categories are undefined"));
        await browser.close();
        return;
      }
    }
    console.group(stryMutAct_9fa48("53") ? `` : (stryCov_9fa48("53"), `📄 Scores:`));
    const scores = getScores(lhr.categories);
    for (const [key, value] of Object.entries(scores)) {
      if (stryMutAct_9fa48("54")) {
        {}
      } else {
        stryCov_9fa48("54");
        if (stryMutAct_9fa48("58") ? value.score >= value.threshold : stryMutAct_9fa48("57") ? value.score <= value.threshold : stryMutAct_9fa48("56") ? false : stryMutAct_9fa48("55") ? true : (stryCov_9fa48("55", "56", "57", "58"), value.score < value.threshold)) {
          if (stryMutAct_9fa48("59")) {
            {}
          } else {
            stryCov_9fa48("59");
            console.error(stryMutAct_9fa48("60") ? `` : (stryCov_9fa48("60"), `❌ ${stryMutAct_9fa48("61") ? key.toLowerCase() : (stryCov_9fa48("61"), key.toUpperCase())}: ${value.score} < ${value.threshold}`));
          }
        } else {
          if (stryMutAct_9fa48("62")) {
            {}
          } else {
            stryCov_9fa48("62");
            console.log(stryMutAct_9fa48("63") ? `` : (stryCov_9fa48("63"), `✅ ${stryMutAct_9fa48("64") ? key.toLowerCase() : (stryCov_9fa48("64"), key.toUpperCase())}: ${value.score} > ${value.threshold}`));
          }
        }
      }
    }
    console.groupEnd();
    if (stryMutAct_9fa48("67") ? false : stryMutAct_9fa48("66") ? true : stryMutAct_9fa48("65") ? lhr.audits : (stryCov_9fa48("65", "66", "67"), !lhr.audits)) {
      if (stryMutAct_9fa48("68")) {
        {}
      } else {
        stryCov_9fa48("68");
        console.error(stryMutAct_9fa48("69") ? "" : (stryCov_9fa48("69"), "❌ Lighthouse audits are undefined"));
        await browser.close();
        return;
      }
    }
    console.group(stryMutAct_9fa48("70") ? `` : (stryCov_9fa48("70"), `📄 Key metrics:`));
    const keyMetrics = getKeyMetrics(lhr.audits);
    for (const [key, value] of Object.entries(keyMetrics)) {
      if (stryMutAct_9fa48("71")) {
        {}
      } else {
        stryCov_9fa48("71");
        console.log(stryMutAct_9fa48("72") ? `` : (stryCov_9fa48("72"), `🚀 ${stryMutAct_9fa48("73") ? key.toLowerCase() : (stryCov_9fa48("73"), key.toUpperCase())}: ${value}`));
      }
    }
    console.groupEnd();
    console.log(stryMutAct_9fa48("74") ? `` : (stryCov_9fa48("74"), `🤗 Closing browser...`));
    await browser.close();
  }
};
const url = process.argv[2];
if (stryMutAct_9fa48("77") ? false : stryMutAct_9fa48("76") ? true : stryMutAct_9fa48("75") ? url : (stryCov_9fa48("75", "76", "77"), !url)) {
  if (stryMutAct_9fa48("78")) {
    {}
  } else {
    stryCov_9fa48("78");
    console.error(stryMutAct_9fa48("79") ? "" : (stryCov_9fa48("79"), "⚠️ Provide a URL as argument. npm start https://www.google.com"));
    process.exit(1);
  }
}
runAudit(url).catch(err => {
  if (stryMutAct_9fa48("80")) {
    {}
  } else {
    stryCov_9fa48("80");
    console.error(stryMutAct_9fa48("81") ? "" : (stryCov_9fa48("81"), "Error running Lighthouse:"), err);
    process.exit(1);
  }
});