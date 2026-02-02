package exception;

public class IdempotentOperationException extends RuntimeException {
    public IdempotentOperationException(String message) {
        super(message);
    }
}
