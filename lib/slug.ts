export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const findCategoryBySlug = (slug: string, categories: string[]) =>
  categories.find((c) => slugify(c) === slug.toLowerCase()) || null;
