import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/social";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("ContactPage");

  const contactLinks = [
    {
      name: t("email"),
      href: SOCIAL_LINKS.email,
      icon: Mail,
      description: t("emailDescription"),
    },
    {
      name: t("github"),
      href: SOCIAL_LINKS.github,
      icon: Github,
      description: t("githubDescription"),
    },
    {
      name: t("linkedin"),
      href: SOCIAL_LINKS.linkedin,
      icon: Linkedin,
      description: t("linkedinDescription"),
    },
  ];

  return (
    <div className="container py-12">
      <div className="max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{t("heading")}</h1>
        <p className="mb-12 text-xl text-muted-foreground">{t("intro")}</p>

        <div className="grid gap-6">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
            >
              <link.icon className="h-6 w-6 text-muted-foreground" />
              <div>
                <h2 className="font-semibold">{link.name}</h2>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
