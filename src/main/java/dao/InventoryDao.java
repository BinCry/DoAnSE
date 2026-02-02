package dao;

import domain.Inventory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class InventoryDao {
    public Inventory lockInventory(Connection connection, long flightInstanceId) throws SQLException {
        String sql = "SELECT flight_instance_id, total, sold, held FROM inventory WHERE flight_instance_id = ? FOR UPDATE";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, flightInstanceId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    return null;
                }
                return new Inventory(
                        rs.getLong("flight_instance_id"),
                        rs.getInt("total"),
                        rs.getInt("sold"),
                        rs.getInt("held")
                );
            }
        }
    }

    public void updateHeld(Connection connection, long flightInstanceId, int deltaHeld) throws SQLException {
        String sql = "UPDATE inventory SET held = held + ? WHERE flight_instance_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, deltaHeld);
            stmt.setLong(2, flightInstanceId);
            stmt.executeUpdate();
        }
    }

    public void convertHeldToSold(Connection connection, long flightInstanceId, int qty) throws SQLException {
        String sql = "UPDATE inventory SET held = held - ?, sold = sold + ? WHERE flight_instance_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, qty);
            stmt.setInt(2, qty);
            stmt.setLong(3, flightInstanceId);
            stmt.executeUpdate();
        }
    }
}
