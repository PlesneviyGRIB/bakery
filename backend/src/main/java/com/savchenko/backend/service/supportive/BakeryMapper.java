package com.savchenko.backend.service.supportive;

import com.savchenko.backend.dto.product.ProductDto;
import com.savchenko.backend.model.Product;

import java.util.function.Function;

public class BakeryMapper {
    public static final Function<Product, ProductDto> ProductToDtoMapper = product -> {
        var dto = new ProductDto();

        dto.count = product.getCount();
        dto.description = product.getDescription();
        dto.productionTime = product.getProductionTime();
        dto.instant = product.getInstant();
        dto.price = product.getPrice();
        dto.title = product.getTitle();

        return dto;
    };
}
