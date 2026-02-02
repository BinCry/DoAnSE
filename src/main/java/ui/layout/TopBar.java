package ui.layout;

import ui.common.AppButton;
import ui.common.Theme;
import ui.common.ThemeManager;
import ui.common.ThemeMode;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.BorderLayout;
import java.awt.Dimension;

public class TopBar extends JPanel {
    private final JLabel titleLabel = new JLabel("SE330 Airline Booking");
    private final AppButton toggleButton = new AppButton("Switch to Dark", AppButton.Variant.SECONDARY);

    public TopBar() {
        setLayout(new BorderLayout());
        setPreferredSize(new Dimension(100, 56));
        setBorder(new EmptyBorder(8, 16, 8, 16));

        add(titleLabel, BorderLayout.WEST);
        add(toggleButton, BorderLayout.EAST);

        toggleButton.addActionListener(event -> ThemeManager.getInstance().toggleTheme());
        applyTheme(ThemeManager.getInstance().getTheme());
        ThemeManager.getInstance().addListener(this::applyTheme);
    }

    private void applyTheme(Theme theme) {
        setBackground(theme.getSurface());
        titleLabel.setFont(theme.getH2());
        titleLabel.setForeground(theme.getTextPrimary());
        if (theme.getMode() == ThemeMode.DARK) {
            toggleButton.setText("Switch to Light");
        } else {
            toggleButton.setText("Switch to Dark");
        }
    }
}
