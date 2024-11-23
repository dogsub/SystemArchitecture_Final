package gcu.backend.dreank.exception;

public class StudyNotFoundException extends BusinessLogicException{
    public StudyNotFoundException() {
        super("해당하는 스터디가 없습니다.");
    }
}
