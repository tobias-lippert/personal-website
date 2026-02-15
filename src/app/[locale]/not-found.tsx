import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-12">
      <h1 className="mb-4 text-6xl font-bold">{t("code")}</h1>
      <h2 className="mb-4 text-2xl font-semibold">{t("title")}</h2>
      <p className="mb-8 max-w-md text-center text-muted-foreground">{t("description")}</p>
      <Button asChild>
        <Link href="/">{t("goHome")}</Link>
      </Button>
    </div>
  );
}
