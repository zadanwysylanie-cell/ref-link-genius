ALTER TABLE public.products ADD COLUMN IF NOT EXISTS verified boolean NOT NULL DEFAULT false;
ALTER TABLE public.shipping_rates ADD COLUMN IF NOT EXISTS signup_url text NOT NULL DEFAULT ''::text;