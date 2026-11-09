-- MADA live sync: one table of events, read/insert for the demo key, Realtime on.
-- Run once in Supabase: SQL Editor > New query > paste > Run.
create table if not exists public.mada_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  room text not null,
  kind text not null,          -- assess | sym | med | msg | plan
  client text,
  payload jsonb not null
);
create index if not exists mada_events_room_idx on public.mada_events (room, id);

alter table public.mada_events enable row level security;
drop policy if exists "demo read" on public.mada_events;
drop policy if exists "demo insert" on public.mada_events;
create policy "demo read"   on public.mada_events for select to anon using (true);
create policy "demo insert" on public.mada_events for insert to anon with check (char_length(room) between 3 and 40);

-- works whether or not "Automatically expose new tables" was ticked
grant usage on schema public to anon;
grant select, insert on public.mada_events to anon;

alter publication supabase_realtime add table public.mada_events;

-- To reset the demo before presenting:
-- delete from public.mada_events where room = 'mada-demo';
