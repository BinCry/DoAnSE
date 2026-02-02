package ui.layout;

import config.AppConfig;
import service.AuthService;
import service.BookingService;
import service.PaymentService;
import ui.common.Theme;
import ui.common.ThemeManager;
import ui.user.LoginScreen;
import util.Db;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.BorderLayout;

public class AppFrame extends JFrame {
    private final JPanel rootPanel = new JPanel(new BorderLayout());
    private final JPanel contentPanel = new JPanel(new BorderLayout());

    public AppFrame(AuthService authService,
                    BookingService bookingService,
                    PaymentService paymentService,
                    Db db,
                    AppConfig config) {
        Theme theme = ThemeManager.getInstance().getTheme();
        setTitle("SE330 Airline Booking");
        setSize(1024, 720);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        rootPanel.setBorder(new EmptyBorder(0, 0, 0, 0));
        rootPanel.setBackground(theme.getBackground());

        TopBar topBar = new TopBar();
        rootPanel.add(topBar, BorderLayout.NORTH);

        contentPanel.setBorder(new EmptyBorder(24, 24, 24, 24));
        contentPanel.setBackground(theme.getBackground());
        contentPanel.add(new LoginScreen(authService, db), BorderLayout.CENTER);

        rootPanel.add(contentPanel, BorderLayout.CENTER);
        setContentPane(rootPanel);

        ThemeManager.getInstance().addListener(updatedTheme -> {
            rootPanel.setBackground(updatedTheme.getBackground());
            contentPanel.setBackground(updatedTheme.getBackground());
        });
    }
}
