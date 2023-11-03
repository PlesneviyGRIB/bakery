package com.savchenko.backend.dtos;

import com.savchenko.backend.enums.ProductCategory;

import java.util.Optional;

public class NewProductDto {
    public ProductCategory discriminator;
    public Long price;
    public Integer count;
    public Optional<Integer> productionTime;
    public String title;
    public String description;
    public Optional<Float> weight;
    public Boolean orderAvailable;
}
