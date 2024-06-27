package com.savchenko.backend.dto.product;

import com.savchenko.backend.dto.TagDto;
import com.savchenko.backend.dto.base.IdAndDatesDto;
import com.savchenko.backend.enums.ProductCategory;

import java.util.List;

public class ProductLightDto extends IdAndDatesDto {

    public ProductCategory productCategory;

    public String title;

    public String description;

    public Long price;

    public Float weight;

    public List<TagDto> tags;

}
