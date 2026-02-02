package ui.common;

import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import java.awt.Window;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.prefs.Preferences;

public class ThemeManager {
    public interface ThemeChangeListener {
        void onThemeChanged(Theme theme);
    }

    private static final String PREF_KEY = "theme.mode";
    private static final ThemeManager INSTANCE = new ThemeManager();

    private final List<ThemeChangeListener> listeners = new CopyOnWriteArrayList<>();
    private final Preferences preferences = Preferences.userNodeForPackage(ThemeManager.class);
    private Theme theme = Theme.light();

    private ThemeManager() {
    }

    public static ThemeManager getInstance() {
        return INSTANCE;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(ThemeMode mode) {
        Theme next = mode == ThemeMode.DARK ? Theme.dark() : Theme.light();
        this.theme = next;
        preferences.put(PREF_KEY, next.getMode().name());
        updateUIDefaults(next);
        notifyListeners(next);
        for (Window window : Window.getWindows()) {
            SwingUtilities.updateComponentTreeUI(window);
            window.repaint();
        }
    }

    public void toggleTheme() {
        setTheme(theme.getMode() == ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);
    }

    public ThemeMode loadPreferredMode(String fallback) {
        String stored = preferences.get(PREF_KEY, fallback);
        return ThemeMode.fromString(stored);
    }

    public void addListener(ThemeChangeListener listener) {
        listeners.add(listener);
    }

    private void notifyListeners(Theme theme) {
        for (ThemeChangeListener listener : listeners) {
            listener.onThemeChanged(theme);
        }
    }

    private void updateUIDefaults(Theme theme) {
        UIManager.put("Panel.background", theme.getBackground());
        UIManager.put("Label.foreground", theme.getTextPrimary());
        UIManager.put("Button.background", theme.getPrimary());
        UIManager.put("Button.foreground", theme.getSurface());
    }
}
