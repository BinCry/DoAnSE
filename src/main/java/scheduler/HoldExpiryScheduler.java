package scheduler;

import service.BookingService;
import util.Db;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class HoldExpiryScheduler {
    private final ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
    private final BookingService bookingService;
    private final Db db;
    private final int pollSeconds;

    public HoldExpiryScheduler(BookingService bookingService, Db db, int pollSeconds) {
        this.bookingService = bookingService;
        this.db = db;
        this.pollSeconds = pollSeconds;
    }

    public void start() {
        executorService.scheduleAtFixedRate(this::runOnce, pollSeconds, pollSeconds, TimeUnit.SECONDS);
    }

    public void stop() {
        executorService.shutdownNow();
    }

    private void runOnce() {
        try (Connection connection = db.getConnection()) {
            connection.setAutoCommit(false);
            bookingService.expireBookings(connection);
            connection.commit();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
}
