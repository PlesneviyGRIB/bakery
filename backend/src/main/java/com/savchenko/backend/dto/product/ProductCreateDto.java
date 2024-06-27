package com.savchenko.backend.dto.product;

import com.savchenko.backend.enums.ProductCategory;

public class ProductCreateDto {

    public ProductCategory productCategory;

    public Long price;

    public String title;

    public String description;

    public Float weight;

}
