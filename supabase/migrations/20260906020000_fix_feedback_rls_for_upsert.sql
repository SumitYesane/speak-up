drop policy if exists "anonymous clients can submit feedback" on public.feedback;
drop policy if exists "anonymous clients can update feedback" on public.feedback;

create policy "clients can submit feedback"
  on public.feedback for insert
  to anon
  with check (
    exists (
      select 1
      from public.sessions
      where public.sessions.id = feedback.session_id
    )
  );

create policy "clients can update feedback"
  on public.feedback for update
  to anon
  using (
    exists (
      select 1
      from public.sessions
      where public.sessions.id = feedback.session_id
    )
  )
  with check (
    exists (
      select 1
      from public.sessions
      where public.sessions.id = feedback.session_id
    )
  );

grant insert, update on public.feedback to anon;
