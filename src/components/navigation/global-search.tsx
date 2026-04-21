"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  CalendarDays,
  Heart,
  Library as LibraryIcon,
  Globe2,
  Tag,
  User,
  MapPin,
  HelpCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useI18n } from "@/components/providers/i18n-provider";
import { useToast } from "@/hooks/use-toast";
import {
  categoryLabel,
  runGlobalSearch,
  type SearchCategory,
  type SearchHit,
} from "@/lib/global-search";
import {
  UNKNOWN_INTENT_OPTIONS,
  classifySearchWord,
  noteUnmatchedSearchWord,
  type UnknownSearchIntentId,
} from "@/lib/unknown-search-intent";
import { cn } from "@/lib/utils";

const MIN_QUERY_CLASSIFY = 2;

const INTENT_ICONS: Record<UnknownSearchIntentId, React.ElementType> = {
  bible: BookOpen,
  plans: CalendarDays,
  devotions: Heart,
  library: LibraryIcon,
  general: Globe2,
  topic: Tag,
  person: User,
  place: MapPin,
  other: HelpCircle,
};

function groupByCategory(
  items: SearchHit[],
  order: SearchCategory[]
): [SearchCategory, SearchHit[]][] {
  const map = new Map<SearchCategory, SearchHit[]>();
  for (const cat of order) map.set(cat, []);
  for (const item of items) {
    const list = map.get(item.category);
    if (list) list.push(item);
  }
  return order
    .map((c) => [c, map.get(c) ?? []] as [SearchCategory, SearchHit[]])
    .filter(([, list]) => list.length > 0);
}

export function GlobalSearchTrigger({ className }: { className?: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const { t, lang } = useI18n();
  const [query, setQuery] = React.useState("");
  const [intentSubmitted, setIntentSubmitted] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("sacred-library:open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("sacred-library:open-search", onOpen);
    };
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const tmr = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(tmr);
  }, [open]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setQuery("");
      setIntentSubmitted(false);
    }
  };

  const results = React.useMemo(
    () => runGlobalSearch(query, lang, t),
    [query, lang, t]
  );

  const grouped = React.useMemo(
    () =>
      groupByCategory(results, [
        "bible",
        "plans",
        "devotions",
        "library",
        "site",
      ]),
    [results]
  );

  const trimmedQuery = query.trim();
  const showUnknownHelp =
    trimmedQuery.length >= MIN_QUERY_CLASSIFY && grouped.length === 0;

  React.useEffect(() => {
    setIntentSubmitted(false);
  }, [trimmedQuery]);

  React.useEffect(() => {
    if (!open || !showUnknownHelp) return;
    const tmr = window.setTimeout(() => {
      noteUnmatchedSearchWord(trimmedQuery, lang);
    }, 450);
    return () => window.clearTimeout(tmr);
  }, [open, showUnknownHelp, trimmedQuery, lang]);

  const flatIds = React.useMemo(
    () => grouped.flatMap(([, list]) => list.map((x) => x.id)),
    [grouped]
  );

  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setActiveId(flatIds[0] ?? null);
  }, [flatIds, query, open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!flatIds.length) return;
      const i = activeId ? flatIds.indexOf(activeId) : -1;
      const next = flatIds[Math.min(i + 1, flatIds.length - 1)];
      setActiveId(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!flatIds.length) return;
      const i = activeId ? flatIds.indexOf(activeId) : 0;
      const next = flatIds[Math.max(i - 1, 0)];
      setActiveId(next);
    } else if (e.key === "Enter" && activeId) {
      e.preventDefault();
      const hit = results.find((r) => r.id === activeId);
      if (hit) {
        handleOpenChange(false);
        router.push(hit.href);
      }
    }
  };

  const handleIntent = (intent: UnknownSearchIntentId) => {
    classifySearchWord(trimmedQuery, intent, lang);
    setIntentSubmitted(true);
    toast({
      title: t("search.intentSavedTitle"),
      description: t("search.intentSavedDesc"),
    });
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "text-muted-foreground hover:text-primary rounded-full",
          className
        )}
        aria-label={t("nav.search")}
        onClick={() => setOpen(true)}
      >
        <Search className="w-5 h-5" />
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-w-xl gap-0 p-0 overflow-hidden rounded-2xl border-border bg-card sm:max-w-lg"
          onKeyDown={onKeyDown}
        >
          <DialogHeader className="p-4 pb-2 space-y-0 border-b border-border">
            <DialogTitle className="sr-only">{t("search.title")}</DialogTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                className="pl-10 h-11 rounded-xl border-border bg-background text-sm"
                autoComplete="off"
                aria-label={t("search.title")}
              />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pt-2 px-1">
              {t("search.hint")}
            </p>
          </DialogHeader>

          <ScrollArea className="max-h-[min(420px,60vh)]">
            <div className="p-2">
              {showUnknownHelp ? (
                <div className="px-2 py-4 space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      {t("search.unknownTitle")}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t("search.unknownIntro")}
                    </p>
                    <p className="text-[11px] text-muted-foreground pt-2">
                      <span className="font-bold uppercase tracking-wider">
                        {t("search.unknownWordLabel")}
                      </span>
                      <span className="mx-2">·</span>
                      <span className="font-medium text-foreground">
                        “{trimmedQuery}”
                      </span>
                    </p>
                  </div>

                  {intentSubmitted ? (
                    <p className="text-sm text-primary font-medium py-2">
                      {t("search.intentSavedDesc")}
                    </p>
                  ) : (
                    <>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {t("search.unknownPick")}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {UNKNOWN_INTENT_OPTIONS.map((id) => {
                          const Icon = INTENT_ICONS[id];
                          return (
                            <Button
                              key={id}
                              type="button"
                              variant="outline"
                              className="h-auto py-3 px-3 justify-start gap-2 rounded-xl border-border text-left font-normal hover:bg-muted"
                              onClick={() => handleIntent(id)}
                            >
                              <Icon className="w-4 h-4 shrink-0 text-primary" />
                              <span className="text-xs font-semibold leading-snug">
                                {t(`search.intent.${id}`)}
                              </span>
                            </Button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              ) : grouped.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-10 px-4">
                  {t("search.empty")}
                </p>
              ) : (
                grouped.map(([cat, items]) => (
                  <div key={cat} className="mb-4 last:mb-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-3 py-2">
                      {categoryLabel(cat, t)}
                    </p>
                    <ul className="space-y-0.5">
                      {items.map((hit) => (
                        <li key={hit.id}>
                          <Link
                            href={hit.href}
                            onClick={() => handleOpenChange(false)}
                            className={cn(
                              "block rounded-xl px-3 py-2.5 text-left transition-colors",
                              activeId === hit.id
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted"
                            )}
                            onMouseEnter={() => setActiveId(hit.id)}
                          >
                            <span className="block text-sm font-semibold text-foreground leading-snug">
                              {hit.title}
                            </span>
                            {hit.subtitle && (
                              <span className="block text-xs text-muted-foreground line-clamp-2 mt-0.5">
                                {hit.subtitle}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
