package com.savchenko.backend.dtos;

import java.time.Instant;

public class ExceptionResultDto {
    public String title;
    public String message;
    public Instant instant;

    public ExceptionResultDto(String title, String message) {
        this.title = title;
        this.message = message;
        this.instant = Instant.now();
    }
}