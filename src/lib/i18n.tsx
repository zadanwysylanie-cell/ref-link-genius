import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { safeStorage, useSettings } from "@/lib/store";

export type Lang = "pl" | "en";

/** Domyślne teksty. Admin może nadpisać każdy z nich w zakładce „Języki”. */
export const DICT: Record<string, { pl: string; en: string }> = {
  "nav.finder": { pl: "Product Finder", en: "Product Finder" },
  "nav.outfits": { pl: "Losowanie outfitów", en: "Outfit roll" },
  "nav.sellers": { pl: "Sprzedawcy", en: "Stores" },
  "nav.agents": { pl: "Agenci", en: "Agents" },
  "nav.promos": { pl: "Promocje", en: "Deals" },
  "nav.guide": { pl: "Poradnik & Narzędzia", en: "Guides & Tools" },
  "nav.tiktok": { pl: "Linki z TikToka", en: "TikTok Links" },
  "finder.all": { pl: "Wszystkie produkty", en: "All products" },
  "finder.search": { pl: "Szukaj produktu...", en: "Search products..." },
  "finder.priceFrom": { pl: "Cena od (PLN)", en: "Price from (PLN)" },
  "finder.priceTo": { pl: "Cena do (PLN)", en: "Price to (PLN)" },
  "finder.clear": { pl: "Wyczyść filtry", en: "Clear filters" },
  "finder.empty": { pl: "Brak produktów do wyświetlenia.", en: "No products to display." },
  "finder.allCats": { pl: "Wszystkie", en: "All" },
  "finder.loadMore": { pl: "Załaduj więcej", en: "Load more" },
  "outfit.shoes": { pl: "Buty", en: "Shoes" },
  "outfit.bottoms": { pl: "Spodnie", en: "Bottoms" },
  "outfit.tops": { pl: "Koszulka / Bluza", en: "Tops & hoodies" },
  "outfit.acc": { pl: "Czapka / Akcesoria", en: "Caps & accessories" },
  "outfit.jacket": { pl: "Kurtka", en: "Jacket" },
  "outfit.addJacket": { pl: "+ Dodaj kurtkę", en: "+ Add jacket" },
  "outfit.removeJacket": { pl: "Usuń kurtkę", en: "Remove jacket" },
  "outfit.kicker": { pl: "Losowanie outfitów", en: "Outfit roll" },
  "outfit.title1": { pl: "Wylosuj", en: "Roll a" },
  "outfit.title2": { pl: "kompletny zestaw", en: "complete fit" },
  "outfit.desc": {
    pl: "Buty · Spodnie · Góra · Czapka / akcesoria — losowane z katalogu.",
    en: "Shoes · Bottoms · Tops · Caps & accessories — rolled from the catalog.",
  },
  "outfit.rolling": { pl: "Losowanie...", en: "Rolling..." },
  "outfit.rollAgain": { pl: "Losuj ponownie 🎲", en: "Roll again 🎲" },
  "outfit.roll": { pl: "Losuj outfit 🎲", en: "Roll outfit 🎲" },
  "outfit.empty": { pl: "Brak produktów w tej kategorii", en: "No products in this category" },
  "outfit.clickRoll": { pl: "Kliknij Losuj", en: "Click Roll" },
  "outfit.preview": { pl: "Podejrzyj", en: "Preview" },
  "outfit.total": { pl: "Łączna cena zestawu", en: "Total fit price" },

  "home.kicker": { pl: "Agent & QC Finds", en: "Agent & QC Finds" },
  "home.title1": { pl: "Znajdź swoje", en: "Find your" },
  "home.title2": { pl: "najlepsze findsy", en: "best finds" },
  "home.subtitle": {
    pl: "Sprawdzone produkty, zdjęcia QC i bezpośrednie linki do zakupu przez Twojego agenta.",
    en: "Verified products, QC photos and direct buy links through your agent.",
  },
  "home.cats": { pl: "Kategorie produktów", en: "Product categories" },
  "home.outfitTitle": {
    pl: "Generator outfitów — wylosuj cały zestaw",
    en: "Outfit generator — roll a full fit",
  },
  "home.outfitDesc": {
    pl: "Buty, spodnie, góra i akcesoria w jednym losowaniu, z ceną w PLN, USD i CNY.",
    en: "Shoes, pants, top and accessories in one roll, priced in PLN, USD and CNY.",
  },
  "home.outfitCta": { pl: "Losuj outfit →", en: "Roll outfit →" },

  "guide.title1": { pl: "Poradnik", en: "Guides" },
  "guide.title2": { pl: "& Narzędzia", en: "& Tools" },
  "guide.subtitle": {
    pl: "Najpierw narzędzia, na dole pełne poradniki krok po kroku.",
    en: "Tools first, full step-by-step guides below.",
  },
  "guide.trackTitle": { pl: "📦 Śledzenie paczek", en: "📦 Package tracking" },
  "guide.trackDesc": {
    pl: "Standardowa dostawa 7–12 dni roboczych.",
    en: "Standard delivery 7–12 business days.",
  },
  "guide.trackPlaceholder": { pl: "Numer przesyłki", en: "Tracking number" },
  "guide.trackCta": { pl: "Sprawdź status", en: "Check status" },
  "guide.trackResult": {
    pl: "w tranzycie, szacowana dostawa 7–12 dni.",
    en: "in transit, estimated delivery 7–12 days.",
  },
  "guide.parcel": { pl: "Paczka", en: "Parcel" },
  "guide.qcTitle": { pl: "🔍 QC Inspector / Finder", en: "🔍 QC Inspector / Finder" },
  "guide.qcDesc": {
    pl: "Wklej ID lub link produktu, aby otworzyć zdjęcia QC.",
    en: "Paste a product ID or link to open QC photos.",
  },
  "guide.qcPlaceholder": { pl: "ID produktu lub link", en: "Product ID or link" },
  "guide.qcCta": { pl: "Znajdź zdjęcia QC", en: "Find QC photos" },
  "guide.convTitle": { pl: "Link Converter", en: "Link Converter" },
  "guide.convDesc": {
    pl: "Wklej link z 1688 / Taobao / Weidian albo gotowy link agenta (USFANS, Kakobuy, Litbuy…) — zamienimy go na link u wybranego agenta.",
    en: "Paste a 1688 / Taobao / Weidian link or an existing agent link (USFANS, Kakobuy, Litbuy…) — we convert it for your agent of choice.",
  },
  "guide.convPlaceholder": {
    pl: "https://detail.1688.com/offer/123456789.html lub link agenta",
    en: "https://detail.1688.com/offer/123456789.html or an agent link",
  },
  "guide.convInvalid": {
    pl: "Nie rozpoznano linku produktu — obsługujemy Weidian, 1688, Taobao oraz linki agentów. Oryginalny link pozostaje bez zmian.",
    en: "Product link not recognised — we support Weidian, 1688, Taobao and agent links. The original link stays unchanged.",
  },
  "guide.source": { pl: "Źródło:", en: "Source:" },
  "guide.openIn": { pl: "Otwórz w", en: "Open in" },
  "guide.copy": { pl: "Kopiuj", en: "Copy" },
  "guide.stepsTitle1": { pl: "Poradniki", en: "Guides" },
  "guide.stepsTitle2": { pl: "krok po kroku", en: "step by step" },
  "guide.stepsSubtitle": {
    pl: "Poradnik Zamawiania · Poradnik Śledzenia Paczki · Poradnik Używania",
    en: "Ordering guide · Package tracking guide · Usage guide",
  },
  "guide.step": { pl: "Krok", en: "Step" },

  "calc.kicker": { pl: "Kalkulator wagi", en: "Weight calculator" },
  "calc.title": {
    pl: "Ile zapłacisz za wysyłkę haulu?",
    en: "How much will your haul shipping cost?",
  },
  "calc.range": { pl: "Minimum 0.5 kg, maksimum 25 kg.", en: "Minimum 0.5 kg, maximum 25 kg." },
  "calc.kilograms": { pl: "kilogramy", en: "kilograms" },
  "calc.less": { pl: "Mniej", en: "Less" },
  "calc.more": { pl: "Więcej", en: "More" },
  "calc.weightAria": { pl: "Waga paczki w kg", en: "Parcel weight in kg" },
  "calc.prices": { pl: "Ceny:", en: "Prices:" },
  "calc.withCoupons": { pl: "Z kuponami", en: "With coupons" },
  "calc.withoutCoupons": { pl: "Bez kuponów", en: "Without coupons" },
  "calc.empty": {
    pl: "Brak zdefiniowanych stawek wysyłki dla tej wagi.",
    en: "No shipping rates defined for this weight.",
  },
  "calc.cheapest": { pl: "Najtańsza opcja", en: "Cheapest option" },
  "calc.code": { pl: "kod", en: "code" },
  "calc.signup": { pl: "Zarejestruj się \u2192", en: "Sign up \u2192" },

  "promos.title1": { pl: "Aktualne", en: "Current" },
  "promos.title2": { pl: "promocje", en: "deals" },
  "promos.subtitle": {
    pl: "Sklepy i produkty z aktywnymi przecenami \u2014 dodawane na bie\u017c\u0105co.",
    en: "Stores and products with active discounts \u2014 updated regularly.",
  },
  "promos.empty": {
    pl: "Brak aktywnych promocji. Zajrzyj p\u00f3\u017aniej.",
    en: "No active deals right now. Check back later.",
  },
  "promos.cta": { pl: "Sprawd\u017a promocj\u0119 \u2192", en: "View deal \u2192" },

  "agents.title1": { pl: "Zaufani", en: "Trusted" },
  "agents.title2": { pl: "agenci", en: "agents" },
  "agents.subtitle": {
    pl: "Wybierz agenta, przez kt\u00f3rego chcesz robi\u0107 zakupy \u2014 poni\u017cej aktualne kupony i bonusy.",
    en: "Pick the agent you want to buy through \u2014 current coupons and bonuses below.",
  },
  "agents.discord": { pl: "Do\u0142\u0105cz na Discord", en: "Join our Discord" },
  "agents.limited": { pl: "Limitowana oferta", en: "Limited offer" },
  "agents.offer": { pl: "$450 w kuponach + 40% zni\u017cki", en: "$450 in coupons + 40% off" },
  "agents.useCode1": { pl: "U\u017cyj kodu", en: "Use code" },
  "agents.useCode2": { pl: "przy rejestracji.", en: "when signing up." },
  "agents.cardCta": {
    pl: "Zarejestruj si\u0119 i odbierz kupony",
    en: "Sign up and claim your coupons",
  },

  "stores.title1": { pl: "Sklepy", en: "Seller" },
  "stores.title2": { pl: "sprzedawc\u00f3w", en: "stores" },
  "stores.empty": { pl: "Brak aktywnych sklep\u00f3w.", en: "No active stores." },
  "stores.products": { pl: "produkt\u00f3w", en: "products" },
  "stores.enter": { pl: "Wejd\u017a \u2192", en: "Enter \u2192" },
};

export const DICT_KEYS = Object.keys(DICT);

export const i18nSettingKey = (lang: Lang, key: string) => `i18n_${lang}_${key}`;

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "pl",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pl");

  useEffect(() => {
    const saved = safeStorage.get("pkmr_lang");
    if (saved === "en" || saved === "pl") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    safeStorage.set("pkmr_lang", l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  const { data: settings } = useSettings();

  /** Zwraca tekst: nadpisanie z panelu → domyślny słownik → fallback → klucz. */
  const t = (key: string, fallback?: string) => {
    const override = settings?.[i18nSettingKey(lang, key)];
    if (override && override.trim()) return override;
    return DICT[key]?.[lang] ?? fallback ?? key;
  };

  return { lang, setLang, t };
}
