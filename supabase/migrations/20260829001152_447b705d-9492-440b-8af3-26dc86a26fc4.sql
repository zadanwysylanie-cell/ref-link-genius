-- Defensive, explicit column-level enforcement for seller credentials.
REVOKE ALL ON public.sellers FROM anon, authenticated;

GRANT SELECT (id, name, slug, logo_url, banner_url, description, active, created_at, updated_at, external_url, link_mode)
  ON public.sellers TO anon, authenticated;

GRANT ALL ON public.sellers TO service_role;

-- Public read policy remains, but column privileges above make username/password_hash unreachable.
DROP POLICY IF EXISTS "sellers public read" ON public.sellers;
CREATE POLICY "sellers public read" ON public.sellers FOR SELECT TO anon, authenticated USING (true);