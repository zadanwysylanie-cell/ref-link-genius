DROP VIEW IF EXISTS public.sellers_public;

CREATE POLICY "sellers public read" ON public.sellers
FOR SELECT TO anon, authenticated USING (true);

GRANT SELECT (id, name, slug, logo_url, banner_url, description, active, external_url, link_mode, created_at, updated_at)
ON public.sellers TO anon, authenticated;