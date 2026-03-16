insert into airport (id, code, city_name, airport_name, terminal_label)
values
  (1, 'SGN', 'Thanh pho Ho Chi Minh', 'Tan Son Nhat', 'Nha ga noi dia'),
  (2, 'HAN', 'Ha Noi', 'Noi Bai', 'Nha ga noi dia'),
  (3, 'DAD', 'Da Nang', 'Da Nang', 'Nha ga noi dia'),
  (4, 'PQC', 'Phu Quoc', 'Phu Quoc', 'Nha ga noi dia');

select setval('airport_id_seq', 4, true);

insert into flight (id, code, origin_airport_id, destination_airport_id, departure_at, arrival_at, status)
values
  (1, 'AU201', 1, 2, '2026-03-20T06:10:00+07:00', '2026-03-20T08:20:00+07:00', 'on_time'),
  (2, 'AU215', 1, 2, '2026-03-20T09:45:00+07:00', '2026-03-20T11:55:00+07:00', 'boarding'),
  (3, 'AU233', 1, 2, '2026-03-20T18:20:00+07:00', '2026-03-20T20:35:00+07:00', 'scheduled'),
  (4, 'AU302', 2, 1, '2026-03-23T07:15:00+07:00', '2026-03-23T09:25:00+07:00', 'scheduled'),
  (5, 'AU330', 2, 1, '2026-03-23T14:20:00+07:00', '2026-03-23T16:30:00+07:00', 'on_time'),
  (6, 'AU348', 2, 1, '2026-03-23T19:05:00+07:00', '2026-03-23T21:15:00+07:00', 'scheduled');

select setval('flight_id_seq', 6, true);

insert into flight_fare_inventory (id, flight_id, fare_family, total_seats, price)
values
  (1, 1, 'pho_thong_tiet_kiem', 8, 1490000),
  (2, 2, 'pho_thong_linh_hoat', 5, 1890000),
  (3, 3, 'thuong_gia', 3, 3490000),
  (4, 4, 'pho_thong_tiet_kiem', 6, 1520000),
  (5, 5, 'pho_thong_linh_hoat', 4, 1920000),
  (6, 6, 'thuong_gia', 2, 3520000);

select setval('flight_fare_inventory_id_seq', 6, true);
