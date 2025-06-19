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
type AuditName = "first-contentful-paint" | "largest-contentful-paint" | "interactive" | "speed-index" | "total-blocking-time";
const auditNames: AuditName[] = stryMutAct_9fa48("0") ? [] : (stryCov_9fa48("0"), [stryMutAct_9fa48("1") ? "" : (stryCov_9fa48("1"), "first-contentful-paint"), stryMutAct_9fa48("2") ? "" : (stryCov_9fa48("2"), "largest-contentful-paint"), stryMutAct_9fa48("3") ? "" : (stryCov_9fa48("3"), "interactive"), stryMutAct_9fa48("4") ? "" : (stryCov_9fa48("4"), "speed-index"), stryMutAct_9fa48("5") ? "" : (stryCov_9fa48("5"), "total-blocking-time")]);
type KeyMetrics = { [key in AuditName]: string };
export function getKeyMetrics(audits: Record<string, unknown>): Partial<KeyMetrics> {
  if (stryMutAct_9fa48("6")) {
    {}
  } else {
    stryCov_9fa48("6");
    const keyMetrics: Partial<KeyMetrics> = {};
    for (const auditName of auditNames) {
      if (stryMutAct_9fa48("7")) {
        {}
      } else {
        stryCov_9fa48("7");
        const audit = audits[auditName] as {
          displayValue: string;
        } | undefined;
        if (stryMutAct_9fa48("10") ? false : stryMutAct_9fa48("9") ? true : stryMutAct_9fa48("8") ? audit : (stryCov_9fa48("8", "9", "10"), !audit)) {
          if (stryMutAct_9fa48("11")) {
            {}
          } else {
            stryCov_9fa48("11");
            continue;
          }
        }
        const displayValue = audit.displayValue;
        if (stryMutAct_9fa48("13") ? false : stryMutAct_9fa48("12") ? true : (stryCov_9fa48("12", "13"), displayValue)) {
          if (stryMutAct_9fa48("14")) {
            {}
          } else {
            stryCov_9fa48("14");
            keyMetrics[auditName] = displayValue;
          }
        }
      }
    }
    return keyMetrics;
  }
}