-- ============================================================
-- Portfolio + WorkStack Tables
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. portfolio_projects — Spotlight cards
create table if not exists public.portfolio_projects (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  location         text not null,
  type             text not null,
  summary          text not null default '',
  metric_label     text not null default '',
  metric_value     text not null default '',
  image_url        text not null default '',
  overlay_gradient text not null default 'from-black/80 via-black/60 to-black/90',
  accent_color     text not null default 'bg-white/55',
  sort_order       int  not null default 0,
  created_at       timestamptz default now()
);

-- 2. portfolio_tags — Tags per project
create table if not exists public.portfolio_tags (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  tag        text not null
);

-- 3. portfolio_gallery — 6-grid gallery
create table if not exists public.portfolio_gallery (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  caption        text not null default '',
  image_url      text not null default '',
  tone_gradient  text not null default 'from-black/60 via-black/35 to-black/70',
  sort_order     int  not null default 0
);

-- 4. workstack_projects — ScrollStack case studies
create table if not exists public.workstack_projects (
  id           uuid primary key default gen_random_uuid(),
  index        text not null default '01',
  title        text not null,
  location     text not null,
  type         text not null,
  description  text not null default '',
  metric       text not null default '',
  metric_label text not null default '',
  palette_from text not null default '#0d0d0d',
  palette_via  text not null default '#111111',
  palette_to   text not null default '#000000',
  accent_color text not null default 'text-amber-300',
  sort_order   int  not null default 0
);

-- ── Row Level Security ─────────────────────────────────────

alter table public.portfolio_projects enable row level security;
alter table public.portfolio_tags     enable row level security;
alter table public.portfolio_gallery  enable row level security;
alter table public.workstack_projects enable row level security;

-- Public read
create policy "Public read portfolio_projects"
  on public.portfolio_projects for select using (true);

create policy "Public read portfolio_tags"
  on public.portfolio_tags for select using (true);

create policy "Public read portfolio_gallery"
  on public.portfolio_gallery for select using (true);

create policy "Public read workstack_projects"
  on public.workstack_projects for select using (true);

-- Admin write
create policy "Admin write portfolio_projects"
  on public.portfolio_projects for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin write portfolio_tags"
  on public.portfolio_tags for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin write portfolio_gallery"
  on public.portfolio_gallery for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin write workstack_projects"
  on public.workstack_projects for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── Seed Data ──────────────────────────────────────────────

insert into public.portfolio_projects (title, location, type, summary, metric_label, metric_value, image_url, overlay_gradient, accent_color, sort_order) values
  ('Halo Suites',        'Seoul',   'Boutique Hospitality', 'Signature suites with luminous arches, gallery-grade art rotations, and choreographed lighting scenes.',            'ADR lift',           '+38%',   '', 'from-indigo-950/80 via-slate-900/75 to-black/90', 'bg-white/55', 0),
  ('Sands Members Club', 'Dubai',   'Private Lounge',        'Molten brass detailing, kinetic textiles, and ambient sound that adapts to guest density.',                         'Membership growth',  '+54%',   '', 'from-black/80 via-black/60 to-black/90',           'bg-white/55', 1),
  ('Cove Duplex',        'TriBeCa', 'Residential',           'Stone planes, hidden light seams, and sculpted millwork for a cinematic two-level loft.',                          'Install timeline',   '9 wks',  '', 'from-black/80 via-black/60 to-black/90',           'bg-white/55', 2);

-- Tags (we need the project ids)
with p as (select id, title from public.portfolio_projects)
insert into public.portfolio_tags (project_id, tag)
select p.id, t.tag from p
cross join lateral (values
  ('Motion lighting'), ('Gallery curation'), ('Concierge scripting')
) as t(tag)
where p.title = 'Halo Suites'
union all
select p.id, t.tag from p
cross join lateral (values
  ('Adaptive acoustics'), ('Perfume map'), ('Live art feed')
) as t(tag)
where p.title = 'Sands Members Club'
union all
select p.id, t.tag from p
cross join lateral (values
  ('Custom millwork'), ('Light seams'), ('Layered textiles')
) as t(tag)
where p.title = 'Cove Duplex';

insert into public.portfolio_gallery (title, caption, image_url, tone_gradient, sort_order) values
  ('Drift Spa',          'Vapor glass + ripple light',  '', 'from-black/60 via-black/35 to-black/70',            0),
  ('Quiet Offices',      'Acoustic focus suites',       '', 'from-black/55 via-black/40 to-black/70',            1),
  ('Lumen Residences',   'Soft metallic gradients',     '', 'from-black/58 via-black/42 to-black/72',            2),
  ('Halo Lobby',         'Arrival choreography',        '', 'from-indigo-900/60 via-slate-900/50 to-black/70',   3),
  ('Skyline Penthouse',  'Mirror void gallery',         '', 'from-black/55 via-black/35 to-black/70',            4),
  ('The Residences',     'Full-floor living',           '', 'from-black/60 via-black/45 to-black/70',            5);

insert into public.workstack_projects (index, title, location, type, description, metric, metric_label, palette_from, palette_via, palette_to, accent_color, sort_order) values
  ('01', 'Halo Suites',        'Seoul',           'Boutique Hospitality',    'Signature suites with luminous arches, gallery-grade art rotations, and choreographed lighting scenes that shift from arrival to late-night.',                  '+38% ADR',  'average daily rate lift',         '#0d0d0d', '#111111', '#000000', 'text-amber-300', 0),
  ('02', 'Sands Members Club', 'Dubai',           'Private Lounge',          'Molten brass detailing, kinetic textiles, and ambient sound systems that adapt to guest density and time of day.',                                              '+54%',      'membership growth in year one',   '#0f0f0f', '#131313', '#090909', 'text-amber-200', 1),
  ('03', 'Cove Duplex',        'TriBeCa, New York','Residential',            'Stone planes, hidden light seams, and sculpted millwork for a cinematic two-level loft. Completed nine weeks from brief to handover.',                          '9 wks',     'brief to white-glove handover',   '#0c0c0c', '#101010', '#000000', 'text-amber-300', 2),
  ('04', 'Drift Spa',          'Bali',            'Wellness & Hospitality',  'Vapor glass partitions, ripple-light ceilings, and material palettes sourced entirely from the surrounding volcanic landscape.',                               '100%',      'occupancy at soft launch',        '#0e0e0e', '#121212', '#090909', 'text-amber-200', 3);
