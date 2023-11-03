package com.savchenko.backend.dtos;

import com.savchenko.backend.enums.ProductCategory;

import java.time.Instant;

public class ProductDto extends BaseDto {
    public ProductCategory discriminator;
    public Long price;
    public Integer count;
    public Instant instant;
    public Integer productionTime;
    public String title;
    public String description;
}
