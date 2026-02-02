package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class AuditLogDao {
    public void insert(Connection connection, String actorRole, Long actorUserId, String action, String entity, Long entityId, String payloadJson) throws SQLException {
        String sql = "INSERT INTO audit_logs(actor_role, actor_user_id, action, entity, entity_id, payload_json) "
                + "VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, actorRole);
            if (actorUserId == null) {
                stmt.setNull(2, java.sql.Types.BIGINT);
            } else {
                stmt.setLong(2, actorUserId);
            }
            stmt.setString(3, action);
            stmt.setString(4, entity);
            if (entityId == null) {
                stmt.setNull(5, java.sql.Types.BIGINT);
            } else {
                stmt.setLong(5, entityId);
            }
            stmt.setString(6, payloadJson);
            stmt.executeUpdate();
        }
    }
}
