package com.savchenko.backend.dto.product;

public class CookieUpdateDto extends ProductCreateOrUpdateDto {
    @Override
    public <T> T accept(Visitor<T> visitor) {
        return visitor.visit(this);
    }
}
