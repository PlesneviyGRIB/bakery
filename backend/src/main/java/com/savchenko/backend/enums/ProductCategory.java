package com.savchenko.backend.enums;

import com.savchenko.backend.domain.business.Cookie;
import com.savchenko.backend.domain.business.Marshmallow;
import com.savchenko.backend.domain.business.Pie;
import com.savchenko.backend.domain.product.Product;

public enum ProductCategory {
    COOKIE,
    PIE,
    MARSHMALLOW;

    public static ProductCategory from(Product product) {
        return product.accept(new Product.Visitor<>() {

            @Override
            public ProductCategory visit(Cookie dto) {
                return COOKIE;
            }

            @Override
            public ProductCategory visit(Pie dto) {
                return PIE;
            }

            @Override
            public ProductCategory visit(Marshmallow dto) {
                return MARSHMALLOW;
            }

        });
    }
}
