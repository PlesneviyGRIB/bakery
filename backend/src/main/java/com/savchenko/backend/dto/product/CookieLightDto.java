package com.savchenko.backend.dto.product;

import com.savchenko.backend.enums.ProductCategory;
import com.savchenko.backend.enums.ProductSize;

public class CookieLightDto extends ProductLightDto {
    public ProductSize size;

    public CookieLightDto() {
        super(ProductCategory.COOKIE);
    }
}
