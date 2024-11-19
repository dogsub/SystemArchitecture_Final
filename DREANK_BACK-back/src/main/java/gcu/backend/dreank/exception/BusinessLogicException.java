package gcu.backend.dreank.exception;

import lombok.Getter;

@Getter
public abstract class BusinessLogicException extends RuntimeException {

    public BusinessLogicException(String message) {
        super(message);
    }
}