package config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class AppConfig {
    private static final String RESOURCE_PATH = "/app.properties";

    private final Properties properties;

    private AppConfig(Properties properties) {
        this.properties = properties;
    }

    public static AppConfig load() {
        Properties props = new Properties();
        try (InputStream input = AppConfig.class.getResourceAsStream(RESOURCE_PATH)) {
            if (input != null) {
                props.load(input);
            }
        } catch (IOException e) {
            throw new IllegalStateException("Không thể đọc app.properties", e);
        }
        return new AppConfig(props);
    }

    public String getTheme() {
        return getString("theme", "LIGHT");
    }

    public String getString(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue);
    }

    public int getInt(String key, int defaultValue) {
        String value = properties.getProperty(key);
        if (value == null) {
            return defaultValue;
        }
        try {
            return Integer.parseInt(value.trim());
        } catch (NumberFormatException ex) {
            return defaultValue;
        }
    }
}
