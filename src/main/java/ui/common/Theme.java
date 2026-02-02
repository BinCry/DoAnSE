package ui.common;

import java.awt.Color;
import java.awt.Font;

public class Theme {
    private final ThemeMode mode;
    private final Color background;
    private final Color surface;
    private final Color surfaceAlt;
    private final Color textPrimary;
    private final Color textMuted;
    private final Color border;
    private final Color primary;
    private final Color primaryHover;
    private final Color success;
    private final Color warning;
    private final Color danger;
    private final Color focusRing;
    private final Color shadowColor;
    private final Font h1;
    private final Font h2;
    private final Font body;

    private Theme(ThemeMode mode,
                  Color background,
                  Color surface,
                  Color surfaceAlt,
                  Color textPrimary,
                  Color textMuted,
                  Color border,
                  Color primary,
                  Color primaryHover,
                  Color success,
                  Color warning,
                  Color danger,
                  Color focusRing,
                  Color shadowColor,
                  Font h1,
                  Font h2,
                  Font body) {
        this.mode = mode;
        this.background = background;
        this.surface = surface;
        this.surfaceAlt = surfaceAlt;
        this.textPrimary = textPrimary;
        this.textMuted = textMuted;
        this.border = border;
        this.primary = primary;
        this.primaryHover = primaryHover;
        this.success = success;
        this.warning = warning;
        this.danger = danger;
        this.focusRing = focusRing;
        this.shadowColor = shadowColor;
        this.h1 = h1;
        this.h2 = h2;
        this.body = body;
    }

    public static Theme light() {
        return new Theme(
                ThemeMode.LIGHT,
                new Color(0xF6F7FB),
                new Color(0xFFFFFF),
                new Color(0xF1F5F9),
                new Color(0x0F172A),
                new Color(0x64748B),
                new Color(0xE2E8F0),
                new Color(0x2563EB),
                new Color(0x1D4ED8),
                new Color(0x22C55E),
                new Color(0xF59E0B),
                new Color(0xEF4444),
                new Color(0x93C5FD),
                new Color(0x0B1220),
                new Font("Segoe UI", Font.BOLD, 26),
                new Font("Segoe UI", Font.BOLD, 20),
                new Font("Segoe UI", Font.PLAIN, 14)
        );
    }

    public static Theme dark() {
        return new Theme(
                ThemeMode.DARK,
                new Color(0x0B1220),
                new Color(0x111827),
                new Color(0x0F172A),
                new Color(0xE5E7EB),
                new Color(0x94A3B8),
                new Color(0x243041),
                new Color(0x60A5FA),
                new Color(0x3B82F6),
                new Color(0x34D399),
                new Color(0xFBBF24),
                new Color(0xF87171),
                new Color(0x2563EB),
                new Color(0x000000),
                new Font("Segoe UI", Font.BOLD, 26),
                new Font("Segoe UI", Font.BOLD, 20),
                new Font("Segoe UI", Font.PLAIN, 14)
        );
    }

    public ThemeMode getMode() {
        return mode;
    }

    public Color getBackground() {
        return background;
    }

    public Color getSurface() {
        return surface;
    }

    public Color getSurfaceAlt() {
        return surfaceAlt;
    }

    public Color getTextPrimary() {
        return textPrimary;
    }

    public Color getTextMuted() {
        return textMuted;
    }

    public Color getBorder() {
        return border;
    }

    public Color getPrimary() {
        return primary;
    }

    public Color getPrimaryHover() {
        return primaryHover;
    }

    public Color getSuccess() {
        return success;
    }

    public Color getWarning() {
        return warning;
    }

    public Color getDanger() {
        return danger;
    }

    public Color getFocusRing() {
        return focusRing;
    }

    public Color getShadowColor() {
        return shadowColor;
    }

    public Font getH1() {
        return h1;
    }

    public Font getH2() {
        return h2;
    }

    public Font getBody() {
        return body;
    }
}
