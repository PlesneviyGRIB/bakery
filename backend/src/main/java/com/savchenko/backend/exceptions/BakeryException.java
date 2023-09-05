package com.savchenko.backend.exceptions;

public class BakeryException extends RuntimeException {
    public BakeryException(String cause, Object... args){
        super(String.format(cause, args));
    }
    public BakeryException(String cause){
        super(cause);
    }
    public BakeryException(){}
}
