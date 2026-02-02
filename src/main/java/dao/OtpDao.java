package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

public class OtpDao {
    public long create(Connection connection, String email, String otpHash, String purpose, Timestamp expiresAt) throws SQLException {
        String sql = "INSERT INTO otp_requests(email, otp_hash, purpose, expires_at) VALUES (?, ?, ?, ?) RETURNING id";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            stmt.setString(2, otpHash);
            stmt.setString(3, purpose);
            stmt.setTimestamp(4, expiresAt);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
                throw new SQLException("Không tạo OTP");
            }
        }
    }

    public OtpRequest findLatest(Connection connection, String email, String purpose) throws SQLException {
        String sql = "SELECT id, otp_hash, expires_at, attempt_count, sent_count "
                + "FROM otp_requests WHERE email = ? AND purpose = ? ORDER BY created_at DESC LIMIT 1";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            stmt.setString(2, purpose);
            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    return null;
                }
                return new OtpRequest(
                        rs.getLong("id"),
                        rs.getString("otp_hash"),
                        rs.getTimestamp("expires_at"),
                        rs.getInt("attempt_count"),
                        rs.getInt("sent_count")
                );
            }
        }
    }

    public void incrementAttempts(Connection connection, long id) throws SQLException {
        String sql = "UPDATE otp_requests SET attempt_count = attempt_count + 1 WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
        }
    }

    public void incrementSent(Connection connection, long id) throws SQLException {
        String sql = "UPDATE otp_requests SET sent_count = sent_count + 1 WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
        }
    }

    public record OtpRequest(long id, String otpHash, Timestamp expiresAt, int attemptCount, int sentCount) {
    }
}
