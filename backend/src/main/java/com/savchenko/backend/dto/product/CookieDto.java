package com.savchenko.backend.dto.product;

import com.savchenko.backend.enums.ProductCategory;
import com.savchenko.backend.enums.ProductSize;

public class CookieDto extends ProductDto {
    public ProductSize size;

    public CookieDto() {
        super(ProductCategory.COOKIE);
    }
}
