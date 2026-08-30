-- Remove blanket public write policies on all content tables
DROP POLICY IF EXISTS "agents public write" ON public.agents;
DROP POLICY IF EXISTS "categories public write" ON public.categories;
DROP POLICY IF EXISTS "guide public write" ON public.guide_steps;
DROP POLICY IF EXISTS "products public write" ON public.products;
DROP POLICY IF EXISTS "promos public write" ON public.promos;
DROP POLICY IF EXISTS "sellers public write" ON public.sellers;
DROP POLICY IF EXISTS "settings public write" ON public.settings;
DROP POLICY IF EXISTS "shipping public write" ON public.shipping_rates;
DROP POLICY IF EXISTS "social public write" ON public.social_links;

-- Revoke Data API write privileges; all writes go through the trusted server path
REVOKE INSERT, UPDATE, DELETE ON public.agents FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.categories FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.guide_steps FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.products FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.promos FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.sellers FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.settings FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.shipping_rates FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.social_links FROM anon, authenticated;

GRANT ALL ON public.agents TO service_role;
GRANT ALL ON public.categories TO service_role;
GRANT ALL ON public.guide_steps TO service_role;
GRANT ALL ON public.products TO service_role;
GRANT ALL ON public.promos TO service_role;
GRANT ALL ON public.sellers TO service_role;
GRANT ALL ON public.settings TO service_role;
GRANT ALL ON public.shipping_rates TO service_role;
GRANT ALL ON public.social_links TO service_role;

-- Sellers: hide credentials from public reads via column-level privileges
REVOKE SELECT ON public.sellers FROM anon, authenticated;
GRANT SELECT (id, name, slug, logo_url, banner_url, description, active, external_url, link_mode, created_at, updated_at)
  ON public.sellers TO anon, authenticated;

-- Storage: product images stay readable, writes restricted to the server
DROP POLICY IF EXISTS "product images insert" ON storage.objects;
DROP POLICY IF EXISTS "product images update" ON storage.objects;
DROP POLICY IF EXISTS "product images delete" ON storage.objects;
