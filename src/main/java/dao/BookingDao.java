package dao;

import domain.Booking;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class BookingDao {
    public long create(Connection connection, long userId, long flightInstanceId, int qty, double totalAmount, Timestamp expiresAt) throws SQLException {
        String sql = "INSERT INTO bookings(user_id, flight_instance_id, qty, total_amount, status, expires_at) "
                + "VALUES (?, ?, ?, ?, 'PENDING_PAYMENT', ?) RETURNING id";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, userId);
            stmt.setLong(2, flightInstanceId);
            stmt.setInt(3, qty);
            stmt.setDouble(4, totalAmount);
            stmt.setTimestamp(5, expiresAt);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
                throw new SQLException("Không tạo booking");
            }
        }
    }

    public Booking lockById(Connection connection, long bookingId) throws SQLException {
        String sql = "SELECT id, user_id, flight_instance_id, qty, status, expires_at FROM bookings WHERE id = ? FOR UPDATE";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, bookingId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    return null;
                }
                return new Booking(
                        rs.getLong("id"),
                        rs.getLong("user_id"),
                        rs.getLong("flight_instance_id"),
                        rs.getInt("qty"),
                        rs.getString("status"),
                        rs.getTimestamp("expires_at")
                );
            }
        }
    }

    public void updateStatus(Connection connection, long bookingId, String status) throws SQLException {
        String sql = "UPDATE bookings SET status = ? WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, status);
            stmt.setLong(2, bookingId);
            stmt.executeUpdate();
        }
    }

    public List<Booking> findExpired(Connection connection, Timestamp now) throws SQLException {
        String sql = "SELECT id, user_id, flight_instance_id, qty, status, expires_at "
                + "FROM bookings WHERE status = 'PENDING_PAYMENT' AND expires_at < ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setTimestamp(1, now);
            try (ResultSet rs = stmt.executeQuery()) {
                List<Booking> result = new ArrayList<>();
                while (rs.next()) {
                    result.add(new Booking(
                            rs.getLong("id"),
                            rs.getLong("user_id"),
                            rs.getLong("flight_instance_id"),
                            rs.getInt("qty"),
                            rs.getString("status"),
                            rs.getTimestamp("expires_at")
                    ));
                }
                return result;
            }
        }
    }
}
