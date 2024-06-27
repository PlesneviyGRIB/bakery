package com.savchenko.backend.dto.product;

import com.savchenko.backend.enums.ProductCategory;

public abstract class ProductFullDto extends ProductLightDto {

    public static ProductFullDto of(ProductCategory productCategory) {
        return switch (productCategory) {
            case COOKIE -> new CookieDto();
            case PIE -> new PieDto();
            case MARSHMALLOW -> new MarshmallowDto();
        };
    }

}
