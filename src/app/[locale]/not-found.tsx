import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12">
      <h1 className="text-6xl font-bold mb-4">{t("code")}</h1>
      <h2 className="text-2xl font-semibold mb-4">{t("title")}</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        {t("description")}
      </p>
      <Button asChild>
        <Link href="/">{t("goHome")}</Link>
      </Button>
    </div>
  );
}
