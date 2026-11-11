
create table public.chat_logs (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  role text not null check (role in ('user','assistant')),
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.chat_logs enable row level security;
create policy "anyone can insert chat logs" on public.chat_logs for insert with check (true);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  description text,
  url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.projects enable row level security;
create policy "public can view published projects" on public.projects for select using (published = true);

create table public.linkedin_posts (
  id uuid primary key default gen_random_uuid(),
  date date not null default current_date,
  preview_text text not null,
  url text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.linkedin_posts enable row level security;
create policy "public can view published linkedin posts" on public.linkedin_posts for select using (published = true);

create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_requests enable row level security;
create policy "anyone can insert contact requests" on public.contact_requests for insert with check (true);
