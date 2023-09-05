package com.savchenko.backend.controllers.advices;

import com.savchenko.backend.dtos.ExceptionResultDto;
import com.savchenko.backend.exceptions.BakeryException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {
    @ExceptionHandler(BakeryException.class)
    public ExceptionResultDto general(BakeryException exception){
        return new ExceptionResultDto(
                exception.getClass().getSimpleName(),
                exception.getMessage()
        );
    }
}
