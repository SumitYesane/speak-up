create table if not exists public.app_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid null references public.sessions(id) on delete set null,
  event_type text not null,
  event_source text not null,
  severity text not null default 'info',
  metadata jsonb null,
  error_message text null,
  created_at timestamptz not null default now(),
  constraint app_events_severity_check check (severity in ('debug', 'info', 'warn', 'error'))
);

create index if not exists app_events_session_id_idx on public.app_events(session_id);
create index if not exists app_events_created_at_idx on public.app_events(created_at);
create index if not exists app_events_event_type_idx on public.app_events(event_type);

alter table public.app_events enable row level security;

create policy "anonymous clients can create app events"
  on public.app_events for insert
  to anon
  with check (session_id is null or exists (
    select 1 from public.sessions where public.sessions.id = app_events.session_id
  ));

grant insert on public.app_events to anon;