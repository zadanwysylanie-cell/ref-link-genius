-- shipping_rates: hide commercial coupon/discount fields from public API
REVOKE ALL ON public.shipping_rates FROM anon, authenticated;
GRANT SELECT (id, agent_name, line_name, base_price, price_per_kg, min_weight, max_weight, sort_order, created_at, price_table, signup_url) ON public.shipping_rates TO anon, authenticated;
GRANT ALL ON public.shipping_rates TO service_role;

-- storage.objects: explicit policies (only trusted server code may touch files)
DROP POLICY IF EXISTS "storage objects service manage" ON storage.objects;
CREATE POLICY "storage objects service manage" ON storage.objects FOR ALL TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "storage objects no public read" ON storage.objects;
CREATE POLICY "storage objects no public read" ON storage.objects FOR SELECT TO anon, authenticated USING (false);
