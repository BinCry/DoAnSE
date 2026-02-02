package ui.common;

import javax.swing.JPanel;
import javax.swing.border.CompoundBorder;
import javax.swing.border.EmptyBorder;
import javax.swing.border.LineBorder;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;

public class AppCard extends JPanel {
    private final int radius;

    public AppCard() {
        this(16);
    }

    public AppCard(int radius) {
        this.radius = radius;
        setOpaque(false);
        applyTheme(ThemeManager.getInstance().getTheme());
        ThemeManager.getInstance().addListener(this::applyTheme);
    }

    private void applyTheme(Theme theme) {
        setBorder(new CompoundBorder(
                new LineBorder(theme.getBorder(), 1, true),
                new EmptyBorder(20, 20, 20, 20)
        ));
        setBackground(theme.getSurface());
        setForeground(theme.getTextPrimary());
        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2.setColor(getBackground());
        g2.fillRoundRect(0, 0, getWidth(), getHeight(), radius, radius);
        g2.dispose();
        super.paintComponent(g);
    }
}
