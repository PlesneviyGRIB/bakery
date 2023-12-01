package com.savchenko.backend.dto.product;

import com.savchenko.backend.enums.ProductCategory;
import com.savchenko.backend.utils.visitor.NewProductVisitor;

import java.util.Map;

public class NewCookieDto extends NewProductDto {
    public NewCookieDto() {
        super(ProductCategory.COOKIE);
    }

    @Override
    public <R> R accept(NewProductVisitor<R> visitor) {
        return visitor.visit(this);
    }

    @Override
    public void validate(Map<String, Object> context) {
        super.validate(context);
    }
}
