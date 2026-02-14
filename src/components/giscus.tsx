"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";

// Configuration for Giscus
// Update these values with your GitHub repository details
const GISCUS_CONFIG = {
  repo: "yourusername/your-repo" as `${string}/${string}`,
  repoId: "YOUR_REPO_ID", // Get from https://giscus.app
  category: "Announcements",
  categoryId: "YOUR_CATEGORY_ID", // Get from https://giscus.app
  mapping: "pathname" as const,
  reactionsEnabled: "1" as const,
  emitMetadata: "0" as const,
  inputPosition: "top" as const,
};

export function Giscus() {
  const { resolvedTheme } = useTheme();
  const locale = useLocale();
  const [mounted, setMounted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted || !ref.current) return;

    // Clear existing content
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", GISCUS_CONFIG.repo);
    script.setAttribute("data-repo-id", GISCUS_CONFIG.repoId);
    script.setAttribute("data-category", GISCUS_CONFIG.category);
    script.setAttribute("data-category-id", GISCUS_CONFIG.categoryId);
    script.setAttribute("data-mapping", GISCUS_CONFIG.mapping);
    script.setAttribute("data-reactions-enabled", GISCUS_CONFIG.reactionsEnabled);
    script.setAttribute("data-emit-metadata", GISCUS_CONFIG.emitMetadata);
    script.setAttribute("data-input-position", GISCUS_CONFIG.inputPosition);
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", locale);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    ref.current.appendChild(script);

    return () => {
      // Cleanup script on unmount
      script.remove();
    };
  }, [mounted, resolvedTheme]);

  // Update theme when it changes
  React.useEffect(() => {
    if (!mounted) return;

    const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    if (!iframe) return;

    iframe.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: resolvedTheme === "dark" ? "dark" : "light",
          },
        },
      },
      "https://giscus.app"
    );
  }, [resolvedTheme, mounted]);

  if (!mounted) {
    return (
      <div className="animate-pulse h-32 bg-muted rounded-lg" />
    );
  }

  return <div ref={ref} className="giscus" />;
}
