package util;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class DateTimes {
    private DateTimes() {
    }

    public static Timestamp nowTimestamp() {
        return Timestamp.from(Instant.now());
    }

    public static Timestamp minutesFromNow(int minutes) {
        return Timestamp.from(Instant.now().plusSeconds(minutes * 60L));
    }

    public static LocalDateTime toLocalDateTime(Timestamp timestamp) {
        return LocalDateTime.ofInstant(timestamp.toInstant(), ZoneId.systemDefault());
    }
}
