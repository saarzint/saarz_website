export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeCategory(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

export function categoryKey(input: string): string {
  return normalizeCategory(input).toLowerCase();
}
