# Chạy backend local

## Yêu cầu
- Java `21`
- Maven `3.9+`
- PostgreSQL local hoặc Supabase PostgreSQL

## Biến môi trường tối thiểu
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `APP_CORS_ALLOWED_ORIGIN_PATTERNS`

Nếu chưa có giá trị riêng, backend đang có mặc định local:

```text
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/airticket
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
APP_CORS_ALLOWED_ORIGIN_PATTERNS=http://localhost:3000,http://127.0.0.1:3000
```

## Chạy local với profile `local`

```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-21"
$env:Path="$env:JAVA_HOME\bin;$env:Path"
$env:SPRING_PROFILES_ACTIVE="local"
mvn spring-boot:run
```

## Kiểm tra nhanh
- Health endpoint: `GET /api/meta/health`
- Tìm sân bay: `GET /api/airports?query=SGN`
- Tìm chuyến bay: `GET /api/flights/search?from=SGN&to=HAN&departureDate=2026-03-20`
