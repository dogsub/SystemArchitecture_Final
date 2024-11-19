package gcu.backend.dreank.exception;

public class TimeSlotAlreadyTakenException extends BusinessLogicException{
    public TimeSlotAlreadyTakenException() {
        super("해당 시간에 등록된 일정이 이미 존재합니다. 시간을 수정해 주세요.");
    }
}
