
-- Create a table for saved news
create table saved_news (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  image_url text,
  source text,
  published_at timestamp with time zone,
  saved_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  
  -- Ensure user can only save the same article once
  unique(user_id, url)
);

-- Enable Row Level Security (RLS)
alter table saved_news enable row level security;

-- Create policies functionality
create policy "Users can view their own saved news"
  on saved_news for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own saved news"
  on saved_news for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete their own saved news"
  on saved_news for delete
  using ( auth.uid() = user_id );

-- Create a table for user profiles (optional, but good practice)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone
);

-- RLS for profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone" 
  on profiles for select 
  using ( true );

create policy "Users can insert their own profile" 
  on profiles for insert 
  with check ( auth.uid() = id );

create policy "Users can update own profile" 
  on profiles for update 
  using ( auth.uid() = id );

-- Function to handle new user setup automatically
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
