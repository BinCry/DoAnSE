package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

public class LoginAttemptDao {
    public LoginAttempt find(Connection connection, String email) throws SQLException {
        String sql = "SELECT email, fail_count, locked_until FROM login_attempts WHERE email = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    return null;
                }
                return new LoginAttempt(
                        rs.getString("email"),
                        rs.getInt("fail_count"),
                        rs.getTimestamp("locked_until")
                );
            }
        }
    }

    public void upsertFailure(Connection connection, String email, int failCount, Timestamp lockedUntil) throws SQLException {
        String sql = "INSERT INTO login_attempts(email, fail_count, locked_until, last_fail_at) "
                + "VALUES (?, ?, ?, ?) "
                + "ON CONFLICT (email) DO UPDATE SET fail_count = EXCLUDED.fail_count, locked_until = EXCLUDED.locked_until, last_fail_at = EXCLUDED.last_fail_at";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            stmt.setInt(2, failCount);
            stmt.setTimestamp(3, lockedUntil);
            stmt.setTimestamp(4, new Timestamp(System.currentTimeMillis()));
            stmt.executeUpdate();
        }
    }

    public void reset(Connection connection, String email) throws SQLException {
        String sql = "DELETE FROM login_attempts WHERE email = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            stmt.executeUpdate();
        }
    }

    public record LoginAttempt(String email, int failCount, Timestamp lockedUntil) {
    }
}
