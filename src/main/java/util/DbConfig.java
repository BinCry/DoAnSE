package util;

import config.AppConfig;

public class DbConfig {
    private final String url;
    private final String user;
    private final String password;

    public DbConfig(String url, String user, String password) {
        this.url = url;
        this.user = user;
        this.password = password;
    }

    public String getUrl() {
        return url;
    }

    public String getUser() {
        return user;
    }

    public String getPassword() {
        return password;
    }

    public static DbConfig from(AppConfig config) {
        return new DbConfig(
                config.getString("db.url", "jdbc:postgresql://localhost:5432/airline"),
                config.getString("db.user", "airline_app"),
                config.getString("db.password", "CHANGE_ME_STRONG_PASSWORD")
        );
    }
}
