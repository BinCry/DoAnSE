package util;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordHasher {
    public String hash(String plainText) {
        return BCrypt.hashpw(plainText, BCrypt.gensalt());
    }

    public boolean verify(String plainText, String hashed) {
        if (plainText == null || hashed == null) {
            return false;
        }
        return BCrypt.checkpw(plainText, hashed);
    }
}
