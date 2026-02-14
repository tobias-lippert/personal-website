import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { getPublishedPosts } from "@/lib/content/posts";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("HomePage");
  const recentPosts = getPublishedPosts().slice(0, 3);

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t("greeting")} <span className="text-primary">{t("name")}</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">{t("intro")}</p>
          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/blog">{t("readBlog")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">{t("aboutMe")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              {t("recentPosts")}
            </h2>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {t("viewAllPosts")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-8">
            {recentPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col space-y-2"
              >
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-muted-foreground">{post.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <time dateTime={post.publishDate}>
                    {formatDate(post.publishDate, locale)}
                  </time>
                  {post.tags.length > 0 && (
                    <div className="flex gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
