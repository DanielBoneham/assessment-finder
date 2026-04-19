-- ============================================================
-- Assessment Finder – Supabase Schema
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================


-- ─── ASSESSORS ───────────────────────────────────────────────

create table assessors (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  email             text unique not null,
  location_city     text not null,
  professional_title text not null,
  governing_body    text,
  registration_number text,
  bio               text,
  price_range       text,                     -- e.g. '£800 – £1,200'
  conditions        text[] default '{}',      -- e.g. ARRAY['ADHD', 'Autism']
  assessment_types  text[] default '{}',      -- e.g. ARRAY['Adults', 'Remote']
  tier              text default 'free',      -- 'free' | 'featured'
  is_verified       boolean default false,
  created_at        timestamptz default now()
);


-- ─── AVAILABILITY ────────────────────────────────────────────

create table availability (
  id                  uuid primary key default gen_random_uuid(),
  assessor_id         uuid not null references assessors(id) on delete cascade,
  availability_range  text not null check (
                        availability_range in (
                          'within-2-weeks',
                          '2-4-weeks',
                          '1-3-months',
                          '3-plus-months'
                        )
                      ),
  next_available_date date,
  last_updated        timestamptz default now()
);


-- ─── LEADS ───────────────────────────────────────────────────

create table leads (
  id            uuid primary key default gen_random_uuid(),
  assessor_id   uuid not null references assessors(id) on delete cascade,
  name          text not null,
  email         text not null,
  message       text,
  condition     text,
  created_at    timestamptz default now()
);


-- ─── INDEXES (speeds up common queries) ──────────────────────

create index on assessors (location_city);
create index on assessors using gin (conditions);       -- fast array search
create index on assessors using gin (assessment_types); -- fast array search
create index on availability (assessor_id);
create index on leads (assessor_id);


-- ─── ROW LEVEL SECURITY ──────────────────────────────────────
-- Locks down tables so only your app (service role) can write.
-- The public can read assessors + availability, but not leads.

alter table assessors   enable row level security;
alter table availability enable row level security;
alter table leads        enable row level security;

-- Anyone can read assessors
create policy "Public can read assessors"
  on assessors for select
  using (true);

-- Anyone can read availability
create policy "Public can read availability"
  on availability for select
  using (true);

-- Anyone can submit a lead (contact form)
create policy "Anyone can submit a lead"
  on leads for insert
  with check (true);

-- Only service role can read leads (you, in your dashboard)
create policy "Service role can read leads"
  on leads for select
  using (auth.role() = 'service_role');


-- ─── SEED DATA (10 example assessors) ────────────────────────

insert into assessors
  (name, email, location_city, professional_title, bio, price_range, conditions, assessment_types, is_verified)
values
  ('Dr Sarah Mitchell',  'sarah.mitchell@example.com',  'London',     'Clinical Psychologist',     'Specialist in adult ADHD and autism assessments with 12 years experience.',   '£900 – £1,200', ARRAY['ADHD', 'Autism'],          ARRAY['Adults', 'Remote'],            true),
  ('James Okafor',       'james.okafor@example.com',    'Manchester', 'Educational Psychologist',  'Expert in childhood dyslexia and learning difference assessments.',           '£600 – £800',   ARRAY['Dyslexia'],                  ARRAY['Children'],                    true),
  ('Dr Priya Sharma',    'priya.sharma@example.com',    'Birmingham', 'Consultant Psychiatrist',   'Provides comprehensive ADHD and autism assessments for adults and children.', '£1,000 – £1,400',ARRAY['Autism', 'ADHD'],           ARRAY['Adults', 'Children'],          true),
  ('Rachel Thornton',    'rachel.thornton@example.com', 'Bristol',    'Specialist Assessor',       'Remote and in-person dyslexia and ADHD assessments for all ages.',           '£500 – £750',   ARRAY['Dyslexia', 'ADHD'],          ARRAY['Adults', 'Children', 'Remote'],true),
  ('Dr Marcus Webb',     'marcus.webb@example.com',     'Leeds',      'Clinical Psychologist',     'Focused on autism spectrum assessments and post-diagnostic support.',         '£850 – £1,100', ARRAY['Autism'],                    ARRAY['Adults'],                      true),
  ('Amelia Grant',       'amelia.grant@example.com',    'Edinburgh',  'Educational Psychologist',  'Dyslexia and dyscalculia specialist working with schools and families.',      '£550 – £700',   ARRAY['Dyslexia'],                  ARRAY['Children', 'Remote'],          false),
  ('Dr Kwame Asante',    'kwame.asante@example.com',    'London',     'Consultant Psychiatrist',   'Adult ADHD specialist offering fast-track assessments in central London.',    '£1,100 – £1,500',ARRAY['ADHD'],                     ARRAY['Adults'],                      true),
  ('Sophie Harrington',  'sophie.h@example.com',        'Cardiff',    'Specialist Assessor',       'Assessment and support for ADHD and autism in children and teenagers.',       '£600 – £850',   ARRAY['ADHD', 'Autism'],            ARRAY['Children', 'Remote'],          false),
  ('Dr Lena Fischer',    'lena.fischer@example.com',    'Glasgow',    'Clinical Psychologist',     'Experienced in adult autism diagnosis and cognitive assessments.',            '£800 – £1,050', ARRAY['Autism', 'Dyslexia'],        ARRAY['Adults', 'Remote'],            true),
  ('Tom Beaumont',       'tom.beaumont@example.com',    'Nottingham', 'Educational Psychologist',  'Specialises in dyslexia screening and full diagnostic assessments.',          '£480 – £680',   ARRAY['Dyslexia'],                  ARRAY['Children', 'Adults'],          false);


-- Seed availability for each assessor
insert into availability (assessor_id, availability_range, next_available_date)
select id,
  case name
    when 'Dr Sarah Mitchell'  then 'within-2-weeks'
    when 'James Okafor'       then 'within-2-weeks'
    when 'Dr Priya Sharma'    then '1-3-months'
    when 'Rachel Thornton'    then 'within-2-weeks'
    when 'Dr Marcus Webb'     then '2-4-weeks'
    when 'Amelia Grant'       then '2-4-weeks'
    when 'Dr Kwame Asante'    then 'within-2-weeks'
    when 'Sophie Harrington'  then '1-3-months'
    when 'Dr Lena Fischer'    then '2-4-weeks'
    when 'Tom Beaumont'       then '3-plus-months'
  end,
  case name
    when 'Dr Sarah Mitchell'  then current_date + 10
    when 'James Okafor'       then current_date + 7
    when 'Dr Priya Sharma'    then current_date + 45
    when 'Rachel Thornton'    then current_date + 5
    when 'Dr Marcus Webb'     then current_date + 18
    when 'Amelia Grant'       then current_date + 21
    when 'Dr Kwame Asante'    then current_date + 9
    when 'Sophie Harrington'  then current_date + 50
    when 'Dr Lena Fischer'    then current_date + 16
    when 'Tom Beaumont'       then current_date + 95
  end
from assessors;
