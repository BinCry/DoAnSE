package domain;

import java.sql.Timestamp;

public class Booking {
    private final long id;
    private final long userId;
    private final long flightInstanceId;
    private final int qty;
    private final String status;
    private final Timestamp expiresAt;

    public Booking(long id, long userId, long flightInstanceId, int qty, String status, Timestamp expiresAt) {
        this.id = id;
        this.userId = userId;
        this.flightInstanceId = flightInstanceId;
        this.qty = qty;
        this.status = status;
        this.expiresAt = expiresAt;
    }

    public long getId() {
        return id;
    }

    public long getUserId() {
        return userId;
    }

    public long getFlightInstanceId() {
        return flightInstanceId;
    }

    public int getQty() {
        return qty;
    }

    public String getStatus() {
        return status;
    }

    public Timestamp getExpiresAt() {
        return expiresAt;
    }
}
