package com.savchenko.backend.dtos;

import java.time.Instant;

public class ProductDto extends BaseDto {
    public Long price;
    public Integer count;
    public Instant instant;
    public Integer productionTime;
    public String title;
    public String description;
}
