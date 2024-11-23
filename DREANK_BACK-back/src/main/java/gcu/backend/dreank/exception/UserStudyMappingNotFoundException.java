package gcu.backend.dreank.exception;

public class UserStudyMappingNotFoundException extends BusinessLogicException{
    public UserStudyMappingNotFoundException() {
        super("해당하는 유저-스터디 매핑이 없습니다.");
    }
}
