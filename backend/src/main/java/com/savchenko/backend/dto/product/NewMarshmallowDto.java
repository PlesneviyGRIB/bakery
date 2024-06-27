package com.savchenko.backend.dto.product;

import com.savchenko.backend.enums.ProductCategory;
import com.savchenko.backend.utils.visitor.NewProductVisitor;

import java.util.Map;

public class NewMarshmallowDto extends ProductCreateDto {
    public NewMarshmallowDto(){
        super(ProductCategory.MARSHMALLOW);
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
