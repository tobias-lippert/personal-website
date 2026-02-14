"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        {t("description")}
      </p>
      <Button onClick={reset}>{t("retry")}</Button>
    </div>
  );
}
