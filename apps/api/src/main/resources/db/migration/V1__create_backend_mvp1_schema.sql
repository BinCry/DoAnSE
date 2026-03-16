create table airport (
  id bigserial primary key,
  code varchar(8) not null unique,
  city_name varchar(120) not null,
  airport_name varchar(160) not null,
  terminal_label varchar(120) not null
);

create table flight (
  id bigserial primary key,
  code varchar(16) not null unique,
  origin_airport_id bigint not null references airport (id),
  destination_airport_id bigint not null references airport (id),
  departure_at timestamptz not null,
  arrival_at timestamptz not null,
  status varchar(32) not null
);

create table flight_fare_inventory (
  id bigserial primary key,
  flight_id bigint not null references flight (id) on delete cascade,
  fare_family varchar(64) not null,
  total_seats integer not null,
  price bigint not null,
  constraint uk_flight_fare_inventory unique (flight_id, fare_family)
);

create index idx_flight_route_departure on flight (origin_airport_id, destination_airport_id, departure_at);
