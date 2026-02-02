package ui.user;

import service.AuthService;
import ui.common.AppButton;
import ui.common.AppCard;
import ui.common.AppPasswordField;
import ui.common.AppTextField;
import ui.common.Theme;
import ui.common.ThemeManager;
import util.Db;

import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.SwingConstants;
import javax.swing.border.EmptyBorder;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.sql.Connection;

public class LoginScreen extends JPanel {
    private final AuthService authService;
    private final Db db;

    private final JLabel title = new JLabel("Airline Booking", SwingConstants.LEFT);
    private final JLabel subtitle = new JLabel("Đăng nhập để tiếp tục");
    private final JLabel emailLabel = new JLabel("Email");
    private final JLabel passwordLabel = new JLabel("Mật khẩu");
    private final AppTextField emailField = new AppTextField(24);
    private final AppPasswordField passwordField = new AppPasswordField(24);
    private final AppButton loginButton = new AppButton("Đăng nhập", AppButton.Variant.PRIMARY);
    private final AppButton forgotButton = new AppButton("Quên mật khẩu", AppButton.Variant.SECONDARY);

    public LoginScreen(AuthService authService, Db db) {
        this.authService = authService;
        this.db = db;

        setLayout(new BorderLayout());
        setBorder(new EmptyBorder(24, 24, 24, 24));
        setOpaque(true);

        JPanel card = buildCard();
        add(card, BorderLayout.CENTER);

        loginButton.addActionListener(event -> handleLogin());

        applyTheme(ThemeManager.getInstance().getTheme());
        ThemeManager.getInstance().addListener(this::applyTheme);
    }

    private JPanel buildCard() {
        AppCard card = new AppCard(16);
        card.setLayout(new BoxLayout(card, BoxLayout.Y_AXIS));
        card.setPreferredSize(new Dimension(420, 360));

        title.setAlignmentX(LEFT_ALIGNMENT);
        subtitle.setAlignmentX(LEFT_ALIGNMENT);
        card.add(title);
        card.add(Box.createVerticalStrut(4));
        card.add(subtitle);
        card.add(Box.createVerticalStrut(16));

        JPanel form = new JPanel(new GridLayout(4, 1, 0, 8));
        form.setOpaque(false);
        form.add(emailLabel);
        form.add(emailField);
        form.add(passwordLabel);
        form.add(passwordField);
        card.add(form);
        card.add(Box.createVerticalStrut(16));

        loginButton.setAlignmentX(LEFT_ALIGNMENT);
        forgotButton.setAlignmentX(LEFT_ALIGNMENT);
        card.add(loginButton);
        card.add(Box.createVerticalStrut(8));
        card.add(forgotButton);

        return card;
    }

    private void handleLogin() {
        String email = emailField.getText().trim();
        String password = new String(passwordField.getPassword());
        if (email.isEmpty() || password.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Vui lòng nhập email và mật khẩu", "Thiếu thông tin", JOptionPane.WARNING_MESSAGE);
            return;
        }
        try (Connection connection = db.getConnection()) {
            authService.login(connection, email, password);
            JOptionPane.showMessageDialog(this, "Đăng nhập thành công", "Thành công", JOptionPane.INFORMATION_MESSAGE);
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, ex.getMessage(), "Đăng nhập thất bại", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void applyTheme(Theme theme) {
        setBackground(theme.getBackground());
        title.setFont(theme.getH1());
        title.setForeground(theme.getTextPrimary());
        subtitle.setFont(theme.getBody());
        subtitle.setForeground(theme.getTextMuted());
        emailLabel.setFont(theme.getBody());
        emailLabel.setForeground(theme.getTextPrimary());
        passwordLabel.setFont(theme.getBody());
        passwordLabel.setForeground(theme.getTextPrimary());
        forgotButton.setForeground(theme.getTextPrimary());
        forgotButton.setBackground(theme.getSurfaceAlt());
        loginButton.setForeground(Color.WHITE);
    }
}
