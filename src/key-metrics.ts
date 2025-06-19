type AuditName =
  | "first-contentful-paint"
  | "largest-contentful-paint"
  | "interactive"
  | "speed-index"
  | "total-blocking-time";

const auditNames: AuditName[] = [
  "first-contentful-paint",
  "largest-contentful-paint",
  // "interactive",
  "speed-index",
  "total-blocking-time",
];

type KeyMetrics = { [key in AuditName]: string };

export function getKeyMetrics(
  audits: Record<string, unknown>
): Partial<KeyMetrics> {
  const keyMetrics: Partial<KeyMetrics> = {};
  for (const auditName of auditNames) {
    const audit = audits[auditName] as { displayValue: string } | undefined;
    if (!audit) {
      continue;
    }
    const displayValue = audit.displayValue;
    if (displayValue) {
      keyMetrics[auditName] = displayValue;
    }
  }
  return keyMetrics;
}
