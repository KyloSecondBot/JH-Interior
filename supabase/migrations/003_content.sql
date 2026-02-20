-- ============================================================
-- Testimonials, Stats, Contact Info
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. testimonials
create table if not exists public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  title      text not null,
  quote      text not null,
  sort_order int  not null default 0
);

-- 2. studio_stats
create table if not exists public.studio_stats (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  value      int  not null default 0,
  suffix     text not null default '',
  sort_order int  not null default 0
);

-- 3. contact_info — single row (id = 1)
create table if not exists public.contact_info (
  id               int  primary key default 1,
  address          text not null default '',
  email            text not null default '',
  phone            text not null default '',
  whatsapp_link    text not null default '',
  maps_embed_url   text not null default '',
  maps_link        text not null default '',
  business_hours   text not null default 'Mon – Sat · 08.00 – 17.00 WIB',
  location_label   text not null default 'Tigaraksa, Tangerang'
);

-- Enforce single-row constraint
create or replace rule "contact_info_single_row" as
  on insert to public.contact_info
  where (select count(*) from public.contact_info) >= 1
  do instead nothing;

-- ── Row Level Security ─────────────────────────────────────

alter table public.testimonials  enable row level security;
alter table public.studio_stats  enable row level security;
alter table public.contact_info  enable row level security;

-- Public read
create policy "Public read testimonials"
  on public.testimonials for select using (true);

create policy "Public read studio_stats"
  on public.studio_stats for select using (true);

create policy "Public read contact_info"
  on public.contact_info for select using (true);

-- Admin write
create policy "Admin write testimonials"
  on public.testimonials for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin write studio_stats"
  on public.studio_stats for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin write contact_info"
  on public.contact_info for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── Seed Data ──────────────────────────────────────────────

insert into public.testimonials (name, title, quote, sort_order) values
  ('Amira Wolfe',  'GM, Halo Suites',            'They choreographed every guest touchpoint with light and motion. We opened at 94% occupancy and held premium ADR from week one.', 0),
  ('Derrick Lau',  'Founder, Sands Members Club', 'JHInterior made our lounge feel alive. The materials, the scent, the art rotations—they manage it like software.',               1);

insert into public.studio_stats (label, value, suffix, sort_order) values
  ('Flagship interiors delivered', 36,  '',     0),
  ('Avg. uplift in nightly ADR',   42,  '%',    1),
  ('Cities serviced worldwide',    12,  '',     2),
  ('Design-to-install timeline',    9,  ' wks', 3);

insert into public.contact_info (id, address, email, phone, whatsapp_link, maps_embed_url, maps_link, business_hours, location_label)
values (
  1,
  'Jl. Syekh Mubarok No. 1A, Kelapa Dua, Pete, Tigaraksa Kecamatan, Tangerang, Banten 15720',
  'contact@jhinterior.id',
  '0852-1558-1607',
  'https://wa.me/6285215581607?text=Hello%20JH%20Interior%2C%20I%27m%20interested%20in%20your%20interior%20design%20services.',
  'https://maps.google.com/maps?q=Jl.+Syekh+Mubarok+No.+1A,+Kelapa+Dua,+Pete,+Tigaraksa,+Tangerang,+Banten+15720,+Indonesia&output=embed&hl=en&z=16',
  'https://maps.google.com/?q=Jl.+Syekh+Mubarok+No.+1A,+Kelapa+Dua,+Pete,+Tigaraksa,+Tangerang,+Banten+15720,+Indonesia',
  'Mon – Sat · 08.00 – 17.00 WIB',
  'Tigaraksa, Tangerang'
);

-- ── Storage: media bucket setup (run separately or via dashboard) ──
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
-- CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
-- CREATE POLICY "Auth upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
