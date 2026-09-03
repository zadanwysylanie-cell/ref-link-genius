# Naprawa logowania, CSV, zdjęć i rozmiarów

## Zakres
- Ustawić lokalne konto administratora na dokładnie `replikaenjoyeradmin` / `Replika271431Enjoyer$` i sprawdzić logowanie przez rzeczywisty formularz.
- Rozszerzyć eksport CSV o pełne `agent_links` (USFans, Kakobuy, Litbuy), główne zdjęcie i całą galerię; import ma odtwarzać te pola zamiast je pomijać.
- Zapisywać nowe zdjęcia pod trwałymi adresami storage zamiast czasowych podpisanych URL-i, aby nie znikały po czasie ani po ponownym wdrożeniu. Zachować istniejące adresy zdjęć w CSV.
- Uzupełnić w bazie rozmiary `S, M, L, XL` dla wszystkich koszulek bez rozmiarów oraz stosować ten domyślny zestaw przy kolejnych zapisach/importach koszulek.
- Dokończyć i zweryfikować wcześniejszy fallback lokalnego cennika wysyłki na wdrożeniu bez działającej funkcji serwerowej.

## Szczegóły techniczne
- CSV dostanie kolumnę JSON `agent_links`, bez utraty przecinków i znaków specjalnych dzięki poprawnemu escapowaniu; parser rozpozna tę kolumnę przy ponownym imporcie.
- Upload pozostanie autoryzowany po stronie serwera, ale zwracany URL będzie stabilny i publicznie odczytywalny; zapis pliku nie będzie otwierany anonimowo.
- Aktualizacja rozmiarów obejmie tylko produkty rozpoznane jako koszulki i tylko rekordy z pustą listą rozmiarów.
- Po zmianach sprawdzę build, eksport/import oraz logowanie administratora w przeglądarce.
