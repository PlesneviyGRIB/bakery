package com.savchenko.backend.dto.product;

import com.savchenko.backend.enums.ProductCategory;
import com.savchenko.backend.utils.visitor.NewProductVisitor;

public class NewPieDto extends NewProductDto {
    public NewPieDto(){
        super(ProductCategory.PIE);
    }

    @Override
    public <R> R accept(NewProductVisitor<R> visitor) {
        return visitor.visit(this);
    }

    @Override
    public void validate() {
        super.validate();
    }
}
