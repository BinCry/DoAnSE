package ui.common;

import javax.swing.JTextField;
import javax.swing.border.CompoundBorder;
import javax.swing.border.EmptyBorder;
import javax.swing.border.LineBorder;

public class AppTextField extends JTextField {
    public AppTextField(int columns) {
        super(columns);
        setBorder(new EmptyBorder(10, 12, 10, 12));
        applyTheme(ThemeManager.getInstance().getTheme());
        ThemeManager.getInstance().addListener(this::applyTheme);
    }

    private void applyTheme(Theme theme) {
        setFont(theme.getBody());
        setForeground(theme.getTextPrimary());
        setBackground(theme.getSurfaceAlt());
        setCaretColor(theme.getTextPrimary());
        setBorder(new CompoundBorder(
                new LineBorder(theme.getBorder(), 1, true),
                new EmptyBorder(8, 12, 8, 12)
        ));
    }
}
