"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-12">
      <h1 className="mb-4 text-4xl font-bold">{t("title")}</h1>
      <p className="mb-8 max-w-md text-center text-muted-foreground">{t("description")}</p>
      <Button onClick={reset}>{t("retry")}</Button>
    </div>
  );
}
