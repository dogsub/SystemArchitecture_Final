package gcu.backend.dreank.exception;

public class NoStudyForTagException extends BusinessLogicException{
    public NoStudyForTagException(String tag) {
        super("해당하는 스터디가 없습니다. tag = "+tag);
    }
}
