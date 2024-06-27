package com.savchenko.backend.dto.product;

public class PieUpdateDto extends ProductCreateOrUpdateDto {
    @Override
    public <T> T accept(Visitor<T> visitor) {
        return visitor.visit(this);
    }
}
