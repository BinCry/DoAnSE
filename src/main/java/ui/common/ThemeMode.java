package ui.common;

public enum ThemeMode {
    LIGHT,
    DARK;

    public static ThemeMode fromString(String value) {
        if (value == null) {
            return LIGHT;
        }
        for (ThemeMode mode : values()) {
            if (mode.name().equalsIgnoreCase(value.trim())) {
                return mode;
            }
        }
        return LIGHT;
    }
}
