package domain;

public class User {
    private final long id;
    private final String email;
    private final String passwordHash;
    private final String nickname;
    private final String role;
    private final String status;

    public User(long id, String email, String passwordHash, String nickname, String role, String status) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.nickname = nickname;
        this.role = role;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getNickname() {
        return nickname;
    }

    public String getRole() {
        return role;
    }

    public String getStatus() {
        return status;
    }
}
