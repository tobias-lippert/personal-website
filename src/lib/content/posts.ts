import { posts } from "#site/content";

export type Post = (typeof posts)[number];

/**
 * Check if a post should be published (not draft and publishDate <= now)
 */
export function isPublished(post: Post): boolean {
  if (post.draft) return false;
  return new Date(post.publishDate) <= new Date();
}

/**
 * Get all published posts, sorted by date (newest first)
 */
export function getPublishedPosts(): Post[] {
  return posts
    .filter(isPublished)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

/**
 * Get all posts including drafts (for dev/preview)
 */
export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slugAsParams === slug);
}

/**
 * Get all unique tags from published posts
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  getPublishedPosts().forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get all unique categories from published posts
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  getPublishedPosts().forEach((post) => {
    if (post.category) categories.add(post.category);
  });
  return Array.from(categories).sort();
}

/**
 * Get all unique series from published posts
 */
export function getAllSeries(): string[] {
  const series = new Set<string>();
  getPublishedPosts().forEach((post) => {
    if (post.series) series.add(post.series);
  });
  return Array.from(series).sort();
}

/**
 * Get posts filtered by tag
 */
export function getPostsByTag(tag: string): Post[] {
  return getPublishedPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * Get posts filtered by category
 */
export function getPostsByCategory(category: string): Post[] {
  return getPublishedPosts().filter(
    (post) => post.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get posts in a series, sorted by seriesOrder
 */
export function getPostsBySeries(series: string): Post[] {
  return getPublishedPosts()
    .filter((post) => post.series?.toLowerCase() === series.toLowerCase())
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

/**
 * Slugify a string for URL usage
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
