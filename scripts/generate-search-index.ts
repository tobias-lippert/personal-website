/**
 * Script to generate search index at build time
 * Run with: npx tsx scripts/generate-search-index.ts
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// Import the content processing to get posts
// This assumes Velite has already run and generated the content
async function generateSearchIndex() {
  try {
    // Dynamic import of the generated content
    const { posts } = await import("../.velite/index.js");

    // Filter to only published posts
    const now = new Date();
    const publishedPosts = posts.filter((post: {
      draft?: boolean;
      publishDate: string;
      slugAsParams: string;
      title: string;
      description: string;
      tags: string[];
      category?: string;
      series?: string;
      raw: string;
    }) => {
      if (post.draft) return false;
      return new Date(post.publishDate) <= now;
    });

    // Create search index entries
    const searchIndex = publishedPosts.map((post: {
      slugAsParams: string;
      title: string;
      description: string;
      tags: string[];
      category?: string;
      series?: string;
      publishDate: string;
      raw: string;
    }) => ({
      id: post.slugAsParams,
      slug: post.slugAsParams,
      title: post.title,
      description: post.description,
      tags: post.tags,
      category: post.category || null,
      series: post.series || null,
      publishDate: post.publishDate,
      // Extract plain text from raw MDX content for search
      content: extractPlainText(post.raw),
    }));

    // Ensure public directory exists
    const publicDir = join(process.cwd(), "public");
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }

    // Write search index
    writeFileSync(
      join(publicDir, "search-index.json"),
      JSON.stringify(searchIndex, null, 2)
    );

    console.log(`✓ Search index generated with ${searchIndex.length} posts`);
  } catch (error) {
    console.error("Error generating search index:", error);
    // Create empty index if no posts exist yet
    const publicDir = join(process.cwd(), "public");
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }
    writeFileSync(join(publicDir, "search-index.json"), JSON.stringify([]));
    console.log("✓ Created empty search index (no posts found)");
  }
}

/**
 * Extract plain text from raw MDX content
 * Removes frontmatter, code blocks, and markdown formatting
 */
function extractPlainText(rawContent: string): string {
  return rawContent
    // Remove frontmatter
    .replace(/^---[\s\S]*?---\n*/m, "")
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove inline code
    .replace(/`[^`]+`/g, "")
    // Convert links to text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    // Remove headers markers but keep text
    .replace(/^#{1,6}\s+/gm, "")
    // Remove bold/italic markers
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    // Remove blockquotes marker
    .replace(/^>\s+/gm, "")
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, "")
    .replace(/^[\s]*\d+\.\s+/gm, "")
    // Normalize whitespace
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    // Limit content length for index size
    .slice(0, 2000);
}

generateSearchIndex();
