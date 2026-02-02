package service;

import config.AppConfig;
import dao.LoginAttemptDao;
import dao.OtpDao;
import dao.UserDao;
import domain.User;
import util.DateTimes;
import util.PasswordHasher;

import java.security.SecureRandom;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;

public class AuthService {
    private final UserDao userDao;
    private final LoginAttemptDao loginAttemptDao;
    private final OtpDao otpDao;
    private final PasswordHasher passwordHasher;
    private final int maxFailures;
    private final int lockMinutes;
    private final int otpTtlMinutes;
    private final int otpMaxAttempts;

    public AuthService(UserDao userDao,
                       LoginAttemptDao loginAttemptDao,
                       OtpDao otpDao,
                       PasswordHasher passwordHasher,
                       AppConfig config) {
        this.userDao = userDao;
        this.loginAttemptDao = loginAttemptDao;
        this.otpDao = otpDao;
        this.passwordHasher = passwordHasher;
        this.maxFailures = config.getInt("login.max.failures", 5);
        this.lockMinutes = config.getInt("login.lock.minutes", 15);
        this.otpTtlMinutes = config.getInt("otp.ttl.minutes", 5);
        this.otpMaxAttempts = config.getInt("otp.max.attempts", 5);
    }

    public User login(Connection connection, String email, String password) throws SQLException {
        LoginAttemptDao.LoginAttempt attempt = loginAttemptDao.find(connection, email);
        if (attempt != null && attempt.lockedUntil() != null && attempt.lockedUntil().after(DateTimes.nowTimestamp())) {
            throw new IllegalStateException("Tài khoản đang bị khóa tạm thời");
        }

        User user = userDao.findByEmail(connection, email);
        if (user == null || !passwordHasher.verify(password, user.getPasswordHash())) {
            int failCount = attempt == null ? 1 : attempt.failCount() + 1;
            Timestamp lockedUntil = null;
            if (failCount >= maxFailures) {
                lockedUntil = DateTimes.minutesFromNow(lockMinutes);
            }
            loginAttemptDao.upsertFailure(connection, email, failCount, lockedUntil);
            throw new IllegalStateException("Email hoặc mật khẩu không đúng");
        }

        loginAttemptDao.reset(connection, email);
        return user;
    }

    public long register(Connection connection, String email, String password, String nickname) throws SQLException {
        String hash = passwordHasher.hash(password);
        return userDao.create(connection, email, hash, nickname, "USER");
    }

    public String generateOtp(Connection connection, String email, String purpose) throws SQLException {
        String otp = String.format("%06d", new SecureRandom().nextInt(1_000_000));
        String hash = passwordHasher.hash(otp);
        otpDao.create(connection, email, hash, purpose, DateTimes.minutesFromNow(otpTtlMinutes));
        return otp;
    }

    public boolean verifyOtp(Connection connection, String email, String purpose, String otp) throws SQLException {
        OtpDao.OtpRequest request = otpDao.findLatest(connection, email, purpose);
        if (request == null) {
            return false;
        }
        if (request.attemptCount() >= otpMaxAttempts) {
            return false;
        }
        if (request.expiresAt().before(DateTimes.nowTimestamp())) {
            return false;
        }
        otpDao.incrementAttempts(connection, request.id());
        return passwordHasher.verify(otp, request.otpHash());
    }
}
