package gcu.backend.dreank.exception;

public class NicknameExistsException extends BusinessLogicException{
    public NicknameExistsException() {
        super("이미 사용 중인 닉네임입니다.");
    }
}
