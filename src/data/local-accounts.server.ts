/**
 * Lokalne konta panelu (admin + sprzedawcy).
 *
 * Plik jest server-only (`.server.ts`), więc hasła/hashe NIE trafiają do
 * przeglądarki. Dzięki temu logowanie działa również tam, gdzie nie ma
 * połączenia z bazą (np. hosting zewnętrzny bez kluczy Supabase).
 *
 * Hash = SHA-256 hasła zapisany w hex (małe litery).
 * Nowy hash wygenerujesz np. w konsoli przeglądarki:
 *   crypto.subtle.digest('SHA-256', new TextEncoder().encode('haslo'))
 */

export type LocalAdmin = { username: string; passwordHash: string };

export type LocalSellerAccount = {
  id: string;
  username: string;
  passwordHash: string;
  active: boolean;
};

/** Konto administratora. Hasło: !Replika271431Enjoyer$ */
export const LOCAL_ADMIN: LocalAdmin = {
  username: "replikaenjoyeradmin",
  passwordHash: "b5bba22a04898d7e80f17440b9f3feb2840886a1d95cfddd4f8323ba974ec3cd",
};

/**
 * Konta sprzedawców. `id` musi odpowiadać wpisowi w `src/data/local-sellers.ts`.
 * Domyślne konto — login: sprzedawca / hasło: Sprzedawca123!
 */
export const LOCAL_SELLERS: LocalSellerAccount[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    username: "sprzedawca",
    passwordHash: "0a0b2b1a5e1a0f4a2e0d1c4b0e3d6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
    active: true,
  },
];
