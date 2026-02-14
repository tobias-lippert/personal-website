"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import MiniSearch from "minisearch";
import { Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: string | null;
  publishDate: string;
}

interface SearchDocument extends SearchResult {
  content: string;
}

export function SearchDialog() {
  const router = useRouter();
  const t = useTranslations("Search");
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [miniSearch, setMiniSearch] = React.useState<MiniSearch<SearchDocument> | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Track mount state for hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Load search index on mount
  React.useEffect(() => {
    async function loadSearchIndex() {
      try {
        const response = await fetch("/search-index.json");
        const documents: SearchDocument[] = await response.json();

        const search = new MiniSearch<SearchDocument>({
          fields: ["title", "description", "content", "tagsText", "category"],
          storeFields: ["id", "slug", "title", "description", "tags", "category", "publishDate"],
          searchOptions: {
            boost: { title: 3, description: 2, tagsText: 1.5 },
            fuzzy: 0.2,
            prefix: true,
          },
          // Convert tags array to string for indexing
          extractField: (document, fieldName) => {
            if (fieldName === "tagsText") {
              return (document as SearchDocument).tags?.join(" ") || "";
            }
            const doc = document as unknown as Record<string, unknown>;
            return doc[fieldName] as string;
          },
        });

        search.addAll(documents);
        setMiniSearch(search);
      } catch (error) {
        console.error("Failed to load search index:", error);
      }
    }

    loadSearchIndex();
  }, []);

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  React.useEffect(() => {
    if (!mounted) return;
    
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mounted]);

  // Focus input when dialog opens and clear query
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Perform search
  React.useEffect(() => {
    if (!miniSearch || !query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const searchResults = miniSearch.search(query).slice(0, 10);
    setResults(searchResults as unknown as SearchResult[]);
    setIsLoading(false);
  }, [query, miniSearch]);

  function handleSelect(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/blog/${slug}`);
  }

  // Render a disabled button before hydration to prevent mismatch
  if (!mounted) {
    return (
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        disabled
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">{t("placeholder")}</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">{t("placeholder")}</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl gap-0 p-0 pt-10">
          <DialogHeader className="px-4 pb-2">
            <DialogTitle className="sr-only">{t("title")}</DialogTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("placeholder")}
                className="pl-10 pr-10"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                  onClick={() => setQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </DialogHeader>

          <div className="max-h-[400px] overflow-y-auto px-2 pb-2">
            {isLoading && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {t("searching")}
              </div>
            )}

            {!isLoading && query && results.length === 0 && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {t("noResults", { query })}
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <ul className="space-y-1">
                {results.map((result) => (
                  <li key={result.id}>
                    <button
                      onClick={() => handleSelect(result.slug)}
                      className="w-full rounded-md px-3 py-2 text-left hover:bg-accent"
                    >
                      <div className="font-medium">{result.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {result.description}
                      </div>
                      {result.tags && result.tags.length > 0 && (
                        <div className="mt-1 flex gap-1">
                          {result.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {!query && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {t("startTyping")}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
