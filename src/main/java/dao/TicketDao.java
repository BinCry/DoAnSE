package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TicketDao {
    public long create(Connection connection, long bookingId, String ticketNo) throws SQLException {
        String sql = "INSERT INTO tickets(booking_id, ticket_no) VALUES (?, ?) RETURNING id";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, bookingId);
            stmt.setString(2, ticketNo);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
                throw new SQLException("Không tạo vé");
            }
        }
    }
}
