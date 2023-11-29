package com.savchenko.backend.dto.product;

import com.savchenko.backend.dto.PhotoDto;
import com.savchenko.backend.dto.TagDto;
import com.savchenko.backend.dto.base.BaseDto;
import com.savchenko.backend.enums.ProductCategory;

import java.time.Instant;
import java.util.List;

public class ProductDto extends BaseDto {
    public ProductCategory discriminator;
    public Long price;
    public Integer count;
    public Instant instant;
    public Integer productionTime;
    public String title;
    public String description;
    public Float weight;
    public List<PhotoDto> photos;
    public List<TagDto> tags;
    protected ProductDto(ProductCategory discriminator) {
        this.discriminator = discriminator;
    }

}
