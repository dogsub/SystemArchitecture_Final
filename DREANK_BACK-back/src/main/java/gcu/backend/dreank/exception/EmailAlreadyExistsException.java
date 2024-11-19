package gcu.backend.dreank.exception;

public class EmailAlreadyExistsException extends BusinessLogicException {
    public EmailAlreadyExistsException() {
        super("이미 가입된 이메일입니다.");
    }
}
