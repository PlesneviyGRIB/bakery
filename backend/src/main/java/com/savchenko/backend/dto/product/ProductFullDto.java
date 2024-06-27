package com.savchenko.backend.dto.product;

import com.savchenko.backend.enums.ProductCategory;

public class ProductFullDto extends ProductLightDto {
    public ProductFullDto(ProductCategory discriminator) {
        super(discriminator);
    }
}
