package ui.common;

import javax.swing.JButton;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Insets;

public class AppButton extends JButton {
    public enum Variant {
        PRIMARY,
        SECONDARY,
        DANGER
    }

    private Variant variant;

    public AppButton(String text, Variant variant) {
        super(text);
        this.variant = variant;
        setFocusPainted(false);
        setContentAreaFilled(true);
        setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        setMargin(new Insets(10, 16, 10, 16));
        setPreferredSize(new Dimension(140, 36));
        setOpaque(true);
        applyTheme(ThemeManager.getInstance().getTheme());
        ThemeManager.getInstance().addListener(this::applyTheme);
    }

    public void setVariant(Variant variant) {
        this.variant = variant;
        applyTheme(ThemeManager.getInstance().getTheme());
    }

    private void applyTheme(Theme theme) {
        setFont(theme.getBody());
        setForeground(theme.getSurface());
        switch (variant) {
            case SECONDARY -> {
                setBackground(theme.getSurfaceAlt());
                setForeground(theme.getTextPrimary());
            }
            case DANGER -> setBackground(theme.getDanger());
            default -> setBackground(theme.getPrimary());
        }
    }
}
