ALTER TABLE public.products ADD COLUMN IF NOT EXISTS show_on_home boolean NOT NULL DEFAULT false;
ALTER TABLE public.products DROP COLUMN IF EXISTS likes;
ALTER TABLE public.products DROP COLUMN IF EXISTS dislikes;