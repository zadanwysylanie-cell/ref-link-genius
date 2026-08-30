REVOKE SELECT ON public.sellers FROM anon, authenticated;
GRANT SELECT (id, name, slug, username, logo_url, banner_url, description, active, created_at, updated_at, external_url, link_mode)
  ON public.sellers TO anon, authenticated;
GRANT ALL ON public.sellers TO service_role;

DROP POLICY IF EXISTS "product images insert" ON storage.objects;
DROP POLICY IF EXISTS "product images update" ON storage.objects;
DROP POLICY IF EXISTS "product images delete" ON storage.objects;