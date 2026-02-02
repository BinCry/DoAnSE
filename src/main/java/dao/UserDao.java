package dao;

import domain.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDao {
    public User findByEmail(Connection connection, String email) throws SQLException {
        String sql = "SELECT id, email, password_hash, nickname, role, status FROM users WHERE email = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    return null;
                }
                return new User(
                        rs.getLong("id"),
                        rs.getString("email"),
                        rs.getString("password_hash"),
                        rs.getString("nickname"),
                        rs.getString("role"),
                        rs.getString("status")
                );
            }
        }
    }

    public long create(Connection connection, String email, String passwordHash, String nickname, String role) throws SQLException {
        String sql = "INSERT INTO users(email, password_hash, nickname, role) VALUES (?, ?, ?, ?) RETURNING id";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            stmt.setString(2, passwordHash);
            stmt.setString(3, nickname);
            stmt.setString(4, role);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
                throw new SQLException("Không tạo được user");
            }
        }
    }
}
