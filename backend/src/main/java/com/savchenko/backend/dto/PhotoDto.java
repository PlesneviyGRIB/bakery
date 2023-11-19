package com.savchenko.backend.dto;

import com.savchenko.backend.dto.base.BaseDto;

import java.time.Instant;

public class PhotoDto extends BaseDto {
    public String src;
    public String title;
    public String description;
    public Instant instant;
    public Boolean isPreview;
}
