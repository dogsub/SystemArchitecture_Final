package gcu.backend.dreank.exception;

public class UserNotFoundException extends BusinessLogicException {
    public UserNotFoundException() {
        super("사용자를 찾을 수 없습니다.");
    }
}
