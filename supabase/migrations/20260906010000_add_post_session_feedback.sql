alter table public.feedback
  alter column rating drop not null,
  alter column comfort_level drop not null,
  alter column repeat_interest drop not null,
  add column if not exists post_session_feeling text null,
  add column if not exists post_session_challenge text null,
  add column if not exists repeat_intention text null,
  add column if not exists optional_feedback text null;

alter table public.feedback
  drop constraint if exists feedback_post_session_feeling_check,
  drop constraint if exists feedback_post_session_challenge_check,
  drop constraint if exists feedback_repeat_intention_check,
  drop constraint if exists feedback_optional_feedback_length_check;

alter table public.feedback
  add constraint feedback_post_session_feeling_check check (post_session_feeling is null or post_session_feeling in (
    'quite_nervous',
    'a_little_nervous',
    'somewhere_in_between',
    'pretty_comfortable',
    'very_comfortable'
  )),
  add constraint feedback_post_session_challenge_check check (post_session_challenge is null or post_session_challenge in (
    'finding_right_words',
    'starting_a_thought',
    'keeping_conversation_going',
    'not_overthinking',
    'speaking_confidently',
    'nothing_in_particular'
  )),
  add constraint feedback_repeat_intention_check check (repeat_intention is null or repeat_intention in (
    'yes',
    'maybe',
    'not_now'
  )),
  add constraint feedback_optional_feedback_length_check check (optional_feedback is null or char_length(optional_feedback) <= 400);

create policy "anonymous clients can update feedback"
  on public.feedback for update
  to anon
  using (exists (
    select 1 from public.sessions where public.sessions.id = feedback.session_id
  ))
  with check (exists (
    select 1 from public.sessions where public.sessions.id = feedback.session_id
  ));

grant update on public.feedback to anon;
