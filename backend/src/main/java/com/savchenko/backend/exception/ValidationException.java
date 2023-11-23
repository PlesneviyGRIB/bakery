package com.savchenko.backend.exception;

public class ValidationException extends BakeryException {
    public ValidationException(String cause, Object... args){
        super(cause, args);
    }
}
