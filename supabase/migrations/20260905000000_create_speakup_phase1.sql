create extension if not exists pgcrypto;

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  participant_name text not null,
  meeting_url text not null,
  status text not null default 'READY',
  started_at timestamptz null,
  completed_at timestamptz null,
  created_at timestamptz not null default now(),
  constraint sessions_status_check check (status in ('READY', 'ACTIVE', 'COMPLETED'))
);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique references public.sessions(id) on delete cascade,
  rating integer not null,
  comfort_level text not null,
  repeat_interest text not null,
  comment text null,
  created_at timestamptz not null default now(),
  constraint feedback_rating_check check (rating between 1 and 5),
  constraint feedback_comfort_level_check check (comfort_level in ('very_comfortable', 'comfortable', 'neutral', 'uncomfortable', 'very_uncomfortable')),
  constraint feedback_repeat_interest_check check (repeat_interest in ('yes', 'maybe', 'no')),
  constraint feedback_comment_length_check check (comment is null or char_length(comment) <= 1000)
);

alter table public.sessions enable row level security;
alter table public.feedback enable row level security;

create policy "anonymous clients can create sessions"
  on public.sessions for insert
  to anon
  with check (true);

create policy "anonymous clients can read sessions"
  on public.sessions for select
  to anon
  using (true);

create policy "anonymous clients can update sessions"
  on public.sessions for update
  to anon
  using (status in ('READY', 'ACTIVE'))
  with check (status in ('READY', 'ACTIVE', 'COMPLETED'));

create policy "anonymous clients can submit feedback"
  on public.feedback for insert
  to anon
  with check (
    exists (
      select 1
      from public.sessions
      where public.sessions.id = feedback.session_id
    )
  );

grant usage on schema public to anon;
grant insert, select, update on public.sessions to anon;
grant insert on public.feedback to anon;
