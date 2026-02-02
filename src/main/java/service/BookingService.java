package service;

import dao.BookingDao;
import dao.HoldDao;
import dao.InventoryDao;
import domain.Booking;
import domain.BookingStatus;
import domain.Inventory;
import exception.NotEnoughSeatsException;
import util.DateTimes;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

public class BookingService {
    private final BookingDao bookingDao;
    private final InventoryDao inventoryDao;
    private final HoldDao holdDao;
    private final int ttlMinutes;

    public BookingService(BookingDao bookingDao,
                          InventoryDao inventoryDao,
                          HoldDao holdDao,
                          int ttlMinutes) {
        this.bookingDao = bookingDao;
        this.inventoryDao = inventoryDao;
        this.holdDao = holdDao;
        this.ttlMinutes = ttlMinutes;
    }

    public long createBooking(Connection connection, long userId, long flightInstanceId, int qty, double totalAmount) throws SQLException {
        Inventory inventory = inventoryDao.lockInventory(connection, flightInstanceId);
        if (inventory == null) {
            throw new IllegalStateException("Không tìm thấy tồn kho chuyến bay");
        }
        if (inventory.getAvailable() < qty) {
            throw new NotEnoughSeatsException("Không đủ ghế trống");
        }
        inventoryDao.updateHeld(connection, flightInstanceId, qty);
        Timestamp expiresAt = DateTimes.minutesFromNow(ttlMinutes);
        long bookingId = bookingDao.create(connection, userId, flightInstanceId, qty, totalAmount, expiresAt);
        holdDao.create(connection, bookingId, qty, expiresAt);
        return bookingId;
    }

    public void expireBookings(Connection connection) throws SQLException {
        List<Booking> expired = bookingDao.findExpired(connection, DateTimes.nowTimestamp());
        for (Booking booking : expired) {
            processExpire(connection, booking);
        }
    }

    private void processExpire(Connection connection, Booking booking) throws SQLException {
        bookingDao.updateStatus(connection, booking.getId(), BookingStatus.EXPIRED.name());
        inventoryDao.updateHeld(connection, booking.getFlightInstanceId(), -booking.getQty());
        holdDao.updateStatus(connection, booking.getId(), "RELEASED");
    }
}
