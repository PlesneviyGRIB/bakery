package com.savchenko.backend.exception;

import com.savchenko.backend.utils.Message;

public class BakeryException extends RuntimeException {
    public BakeryException(String cause, Object... args){
        super(Message.format(cause, args));
    }
    public BakeryException(String cause){
        super(cause);
    }
    public BakeryException(){}
}
