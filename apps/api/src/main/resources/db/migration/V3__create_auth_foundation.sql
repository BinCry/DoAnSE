create table auth_role (
  id bigserial primary key,
  code varchar(64) not null unique,
  name varchar(120) not null,
  is_staff boolean not null default false
);

create table auth_permission (
  id bigserial primary key,
  code varchar(120) not null unique,
  description varchar(255) not null
);

create table user_account (
  id bigserial primary key,
  email varchar(160) not null,
  password_hash varchar(255) not null,
  display_name varchar(160) not null,
  phone varchar(20),
  status varchar(32) not null,
  email_verified boolean not null default false,
  locked_at timestamptz,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index uk_user_account_email_lower on user_account (lower(email));

create table user_role (
  user_id bigint not null references user_account (id) on delete cascade,
  role_id bigint not null references auth_role (id) on delete cascade,
  primary key (user_id, role_id)
);

create table role_permission (
  role_id bigint not null references auth_role (id) on delete cascade,
  permission_id bigint not null references auth_permission (id) on delete cascade,
  primary key (role_id, permission_id)
);

create table refresh_session (
  id bigserial primary key,
  user_id bigint not null references user_account (id) on delete cascade,
  token_key varchar(120) not null unique,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  user_agent varchar(255),
  ip_address varchar(64)
);

create index idx_refresh_session_user_expires on refresh_session (user_id, expires_at);

create table otp_challenge (
  id bigserial primary key,
  user_id bigint references user_account (id) on delete cascade,
  channel varchar(32) not null,
  purpose varchar(64) not null,
  target_value varchar(190) not null,
  otp_hash varchar(255) not null,
  expires_at timestamptz not null,
  verified_at timestamptz,
  consumed_at timestamptz,
  attempt_count integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_otp_challenge_target_purpose on otp_challenge (target_value, purpose, created_at desc);

insert into auth_role (code, name, is_staff)
values
  ('guest', 'Khach vang lai', false),
  ('customer', 'Khach hang', false),
  ('member', 'Hoi vien', false),
  ('ticket_agent', 'Nhan vien ban ve', true),
  ('customer_support', 'Nhan vien cham soc khach hang', true),
  ('operations_staff', 'Nhan vien dieu hanh', true),
  ('finance_staff', 'Nhan vien ke toan', true),
  ('content_editor', 'Bien tap noi dung', true),
  ('system_admin', 'Quan tri vien he thong', true);

insert into auth_permission (code, description)
values
  ('public.booking_lookup', 'Tra cuu dat cho cong khai co xac minh'),
  ('customer.self_service', 'Tu phuc vu sau dat cho cho khach hang'),
  ('member.loyalty', 'Su dung tinh nang diem thuong va voucher'),
  ('backoffice.sales', 'Truy cap module ban ve noi bo'),
  ('backoffice.support', 'Truy cap module cham soc khach hang'),
  ('backoffice.operations', 'Truy cap module dieu hanh chuyen bay'),
  ('backoffice.finance', 'Truy cap module tai chinh va doi soat'),
  ('backoffice.cms', 'Truy cap module quan tri noi dung'),
  ('backoffice.admin', 'Truy cap module quan tri he thong');

insert into role_permission (role_id, permission_id)
select role.id, permission.id
from auth_role role
join auth_permission permission on (
  (role.code = 'guest' and permission.code = 'public.booking_lookup')
  or (role.code = 'customer' and permission.code in ('public.booking_lookup', 'customer.self_service'))
  or (role.code = 'member' and permission.code in ('public.booking_lookup', 'customer.self_service', 'member.loyalty'))
  or (role.code = 'ticket_agent' and permission.code = 'backoffice.sales')
  or (role.code = 'customer_support' and permission.code = 'backoffice.support')
  or (role.code = 'operations_staff' and permission.code = 'backoffice.operations')
  or (role.code = 'finance_staff' and permission.code = 'backoffice.finance')
  or (role.code = 'content_editor' and permission.code = 'backoffice.cms')
  or (role.code = 'system_admin' and permission.code in (
    'public.booking_lookup',
    'customer.self_service',
    'member.loyalty',
    'backoffice.sales',
    'backoffice.support',
    'backoffice.operations',
    'backoffice.finance',
    'backoffice.cms',
    'backoffice.admin'
  ))
);
