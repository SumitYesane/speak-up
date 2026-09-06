alter table public.sessions
  add column if not exists pre_session_goal text null,
  add column if not exists pre_session_feeling text null;

alter table public.sessions
  drop constraint if exists sessions_pre_session_goal_check;

alter table public.sessions
  add constraint sessions_pre_session_goal_check
  check (pre_session_goal is null or pre_session_goal in (
    'speak_more_comfortably',
    'stop_overthinking',
    'feel_more_confident',
    'just_get_some_practice'
  ));

alter table public.sessions
  drop constraint if exists sessions_pre_session_feeling_check;

alter table public.sessions
  add constraint sessions_pre_session_feeling_check
  check (pre_session_feeling is null or pre_session_feeling in (
    'a_little_nervous',
    'a_bit_unsure',
    'somewhere_in_between',
    'pretty_comfortable',
    'feeling_confident'
  ));