package com.savchenko.backend.dto.product;

import com.savchenko.backend.enums.ProductCategory;
import com.savchenko.backend.utils.visitor.NewProductVisitor;

public class NewMarshmallowDto extends NewProductDto {
    public NewMarshmallowDto(){
        super(ProductCategory.MARSHMALLOW);
    }

    @Override
    public <R> R accept(NewProductVisitor<R> visitor) {
        return visitor.visit(this);
    }
}
