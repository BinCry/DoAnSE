package service;

import dao.BookingDao;
import dao.HoldDao;
import dao.InventoryDao;
import dao.TicketDao;
import domain.Booking;
import domain.BookingStatus;
import exception.BookingExpiredException;
import exception.IdempotentOperationException;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.UUID;

public class PaymentService {
    private final BookingDao bookingDao;
    private final InventoryDao inventoryDao;
    private final HoldDao holdDao;
    private final TicketDao ticketDao;

    public PaymentService(BookingDao bookingDao,
                          InventoryDao inventoryDao,
                          HoldDao holdDao,
                          TicketDao ticketDao) {
        this.bookingDao = bookingDao;
        this.inventoryDao = inventoryDao;
        this.holdDao = holdDao;
        this.ticketDao = ticketDao;
    }

    public void confirmPayment(Connection connection, long bookingId) throws SQLException {
        Booking booking = bookingDao.lockById(connection, bookingId);
        if (booking == null) {
            throw new IllegalStateException("Không tìm thấy booking");
        }
        if (BookingStatus.EXPIRED.name().equals(booking.getStatus())) {
            throw new BookingExpiredException("Booking đã hết hạn");
        }
        if (!BookingStatus.PENDING_PAYMENT.name().equals(booking.getStatus())) {
            throw new IdempotentOperationException("Booking đã xử lý trước đó");
        }
        bookingDao.updateStatus(connection, bookingId, BookingStatus.PAID.name());
        inventoryDao.convertHeldToSold(connection, booking.getFlightInstanceId(), booking.getQty());
        holdDao.updateStatus(connection, bookingId, "CONSUMED");
        ticketDao.create(connection, bookingId, "TK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        bookingDao.updateStatus(connection, bookingId, BookingStatus.ISSUED.name());
    }
}
