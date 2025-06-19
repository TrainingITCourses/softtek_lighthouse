import type { Result } from "lighthouse";

type CategoryName = 'performance' | 'accessibility' | 'seo' | 'best-practices';
const categoryNames: CategoryName[] = ['performance', 'accessibility', 'seo', 'best-practices'];

type Score = { "score": number; "threshold": number };
type Scores = { [key in CategoryName]: Score };

const thresholds: Record<CategoryName, number> = {
  "performance": 0.9,
  "accessibility": 0.9,
  "seo": 0.9,
  "best-practices": 0.9
};


export function getScores(categories: Record<string, Result.Category>): Partial<Scores> {
  const scores: Partial<Scores> = {}
  for (const categoryName of categoryNames) {
    const category = categories[categoryName];
    if (!category) {
      continue;
    }
    const score = category.score ?? 0;
    const threshold = thresholds[categoryName];
    scores[categoryName] = {
      "score": score ?? 0,
      "threshold": threshold
    };
  }
  return scores;
}