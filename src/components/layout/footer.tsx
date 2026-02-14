import { useTranslations } from "next-intl";
import { SOCIAL_LINKS } from "@/lib/social";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          {t("rights", { year: new Date().getFullYear() })}
        </p>
        <div className="flex gap-4">
          <a
            href={SOCIAL_LINKS.github}
            className="text-sm text-muted-foreground hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            className="text-sm text-muted-foreground hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
