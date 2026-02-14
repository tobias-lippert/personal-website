import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { getPublishedPosts } from "@/lib/content/posts";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("BlogPage");
  const posts = getPublishedPosts();

  return (
    <div className="container py-12">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {t("description")}
        </p>

        {/* Posts */}
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <time dateTime={post.publishDate}>
                    {formatDate(post.publishDate, locale)}
                  </time>
                  {post.category && (
                    <>
                      <span>·</span>
                      <span>{post.category}</span>
                    </>
                  )}
                  {post.series && (
                    <>
                      <span>·</span>
                      <span>{t("series", { name: post.series })}</span>
                    </>
                  )}
                </div>
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-muted-foreground">{post.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-muted-foreground text-center py-12">
            {t("noPosts")}
          </p>
        )}
      </div>
    </div>
  );
}
