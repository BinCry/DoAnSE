package app;

import config.AppConfig;
import dao.BookingDao;
import dao.HoldDao;
import dao.InventoryDao;
import dao.LoginAttemptDao;
import dao.OtpDao;
import dao.TicketDao;
import dao.UserDao;
import scheduler.HoldExpiryScheduler;
import service.AuthService;
import service.BookingService;
import service.PaymentService;
import ui.common.ThemeManager;
import ui.common.ThemeMode;
import ui.layout.AppFrame;
import util.Db;
import util.DbConfig;
import util.PasswordHasher;

import javax.swing.SwingUtilities;

public class Main {
    public static void main(String[] args) {
        AppConfig config = AppConfig.load();
        ThemeManager themeManager = ThemeManager.getInstance();
        ThemeMode mode = themeManager.loadPreferredMode(config.getTheme());
        themeManager.setTheme(mode);

        Db db = new Db(DbConfig.from(config));

        BookingService bookingService = new BookingService(
                new BookingDao(),
                new InventoryDao(),
                new HoldDao(),
                config.getInt("booking.ttl.minutes", 15)
        );
        HoldExpiryScheduler scheduler = new HoldExpiryScheduler(
                bookingService,
                db,
                config.getInt("booking.ttl.poll.seconds", 30)
        );
        scheduler.start();

        AuthService authService = new AuthService(
                new UserDao(),
                new LoginAttemptDao(),
                new OtpDao(),
                new PasswordHasher(),
                config
        );
        PaymentService paymentService = new PaymentService(
                new BookingDao(),
                new InventoryDao(),
                new HoldDao(),
                new TicketDao()
        );

        SwingUtilities.invokeLater(() -> {
            AppFrame frame = new AppFrame(authService, bookingService, paymentService, db, config);
            frame.setVisible(true);
        });
    }
}
