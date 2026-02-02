package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;

public class HoldDao {
    public void create(Connection connection, long bookingId, int qty, Timestamp expiresAt) throws SQLException {
        String sql = "INSERT INTO reservation_holds(booking_id, qty, expires_at, status) VALUES (?, ?, ?, 'HELD')";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, bookingId);
            stmt.setInt(2, qty);
            stmt.setTimestamp(3, expiresAt);
            stmt.executeUpdate();
        }
    }

    public void updateStatus(Connection connection, long bookingId, String status) throws SQLException {
        String sql = "UPDATE reservation_holds SET status = ? WHERE booking_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, status);
            stmt.setLong(2, bookingId);
            stmt.executeUpdate();
        }
    }
}
