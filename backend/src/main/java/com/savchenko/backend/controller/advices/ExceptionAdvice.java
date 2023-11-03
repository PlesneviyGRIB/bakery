package com.savchenko.backend.controller.advices;

import com.savchenko.backend.dto.ExceptionResultDto;
import com.savchenko.backend.exception.BakeryException;
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
