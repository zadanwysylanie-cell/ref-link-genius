import { cnyFromPln, money, usdFromPln } from "@/lib/store";
import { useLang } from "@/lib/i18n";

/** Main price — PLN for Polish, USD for English — with secondary estimates. */
export function PriceTags({ pln, size = "md" }: { pln: number; size?: "sm" | "md" | "lg" }) {
  const { lang } = useLang();
  const main = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";
  const isEn = lang === "en";

  return (
    <div>
      <p className={`font-display ${main} font-bold leading-tight`}>
        {isEn ? `$${money(usdFromPln(pln))}` : `${money(pln)} PLN`}
      </p>
      <p className="text-[11px] text-muted-foreground">
        {isEn ? `≈ ${money(pln)} PLN` : `≈ $${money(usdFromPln(pln))}`} · ¥{money(cnyFromPln(pln))}
      </p>
    </div>
  );
}

export function QualityBadges({ quality, batch }: { quality: string; batch?: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="rounded-md border border-brand-teal/50 bg-brand-teal/15 px-2 py-0.5 text-[11px] font-semibold text-brand-cyan">
        Quality: {quality || "—"}
      </span>
      {batch ? (
        <span className="rounded-md border border-primary/50 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
          Batch: {batch}
        </span>
      ) : null}
    </div>
  );
}

/** Zielona plakietka „Zweryfikowany” pokazywana na produktach. */
export function VerifiedBadge({ className = "" }: { className?: string }) {
  const { lang } = useLang();
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border border-emerald-400/70 bg-surface-deep/85 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.55)] backdrop-blur ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
        <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6Z" />
      </svg>
      {lang === "en" ? "Verified" : "Zweryfikowany"}
    </span>
  );
}
