create table saved_passenger (
  id bigserial primary key,
  user_id bigint not null references user_account (id) on delete cascade,
  full_name varchar(160) not null,
  passenger_type varchar(32) not null,
  date_of_birth date not null,
  document_type varchar(40) not null,
  document_number varchar(64) not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_saved_passenger_user_created on saved_passenger (user_id, created_at desc);
create index idx_saved_passenger_user_primary on saved_passenger (user_id, is_primary desc, created_at desc);
