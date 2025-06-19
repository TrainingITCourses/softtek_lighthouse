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
import type { Result } from "lighthouse";
type CategoryName = 'performance' | 'accessibility' | 'seo' | 'best-practices';
const categoryNames: CategoryName[] = stryMutAct_9fa48("82") ? [] : (stryCov_9fa48("82"), [stryMutAct_9fa48("83") ? "" : (stryCov_9fa48("83"), 'performance'), stryMutAct_9fa48("84") ? "" : (stryCov_9fa48("84"), 'accessibility'), stryMutAct_9fa48("85") ? "" : (stryCov_9fa48("85"), 'seo'), stryMutAct_9fa48("86") ? "" : (stryCov_9fa48("86"), 'best-practices')]);
type Score = {
  "score": number;
  "threshold": number;
};
type Scores = { [key in CategoryName]: Score };
const thresholds: Record<CategoryName, number> = stryMutAct_9fa48("87") ? {} : (stryCov_9fa48("87"), {
  "performance": 0.9,
  "accessibility": 0.9,
  "seo": 0.9,
  "best-practices": 0.9
});
export function getScores(categories: Record<string, Result.Category>): Partial<Scores> {
  if (stryMutAct_9fa48("88")) {
    {}
  } else {
    stryCov_9fa48("88");
    const scores: Partial<Scores> = {};
    for (const categoryName of categoryNames) {
      if (stryMutAct_9fa48("89")) {
        {}
      } else {
        stryCov_9fa48("89");
        const category = categories[categoryName];
        if (stryMutAct_9fa48("92") ? false : stryMutAct_9fa48("91") ? true : stryMutAct_9fa48("90") ? category : (stryCov_9fa48("90", "91", "92"), !category)) {
          if (stryMutAct_9fa48("93")) {
            {}
          } else {
            stryCov_9fa48("93");
            continue;
          }
        }
        const score = stryMutAct_9fa48("94") ? category.score && 0 : (stryCov_9fa48("94"), category.score ?? 0);
        const threshold = thresholds[categoryName];
        scores[categoryName] = stryMutAct_9fa48("95") ? {} : (stryCov_9fa48("95"), {
          "score": stryMutAct_9fa48("96") ? score && 0 : (stryCov_9fa48("96"), score ?? 0),
          "threshold": threshold
        });
      }
    }
    return scores;
  }
}