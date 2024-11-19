package gcu.backend.dreank.exception;

public class CalendarEntryNotFoundException extends BusinessLogicException{
    public CalendarEntryNotFoundException() {
        super("Calendar entry not found.");
    }
}
