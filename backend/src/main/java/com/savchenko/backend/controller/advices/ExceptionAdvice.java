package com.savchenko.backend.controller.advices;

import com.savchenko.backend.dto.exception.ExceptionResultDto;
import com.savchenko.backend.exception.BakeryException;
import com.savchenko.backend.exception.ValidationException;
import com.savchenko.backend.utils.Message;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@ResponseStatus(HttpStatus.BAD_REQUEST)
@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(BakeryException.class)
    public ExceptionResultDto general(BakeryException exception) {
        exception.printStackTrace();
        return new ExceptionResultDto(
                exception.getClass().getSimpleName(),
                exception.getMessage()
        );
    }

    @ExceptionHandler(ValidationException.class)
    public ExceptionResultDto validationError(ValidationException exception) {
        return new ExceptionResultDto(
                exception.getClass().getSimpleName(),
                exception.getMessage()
        );
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ExceptionResultDto noElement(NoSuchElementException exception) {
        exception.printStackTrace();
        return new ExceptionResultDto(
                Message.format("NoSuchElement"),
                exception.getMessage()
        );
    }

    @ExceptionHandler(RuntimeException.class)
    public ExceptionResultDto runtime(RuntimeException exception) {
        exception.printStackTrace();
        return new ExceptionResultDto(
                exception.getClass().getSimpleName(),
                exception.getMessage()
        );
    }
}
