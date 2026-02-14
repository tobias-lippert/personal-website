import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { SOCIAL_LINKS } from "@/lib/social";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("AboutPage");

  return (
    <div className="container py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-8">
          {t("heading")}
        </h1>

        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-xl text-muted-foreground mb-8">{t("intro")}</p>

          <h2>{t("backgroundTitle")}</h2>
          <p>{t("backgroundText")}</p>

          <h2>{t("whatIDoTitle")}</h2>
          <p>{t("whatIDoText")}</p>

          <h2>{t("interestsTitle")}</h2>
          <ul>
            <li>{t("interest1")}</li>
            <li>{t("interest2")}</li>
            <li>{t("interest3")}</li>
            <li>{t("interest4")}</li>
          </ul>

          <h2>{t("connectTitle")}</h2>
          <p>
            {t.rich("connectText", {
              github: (chunks) => (
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chunks}
                </a>
              ),
              linkedin: (chunks) => (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
