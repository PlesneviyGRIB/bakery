package com.savchenko.backend.model.business;

import com.savchenko.backend.model.Product;
import com.savchenko.backend.utils.visitor.ProductVisitor;

public class Marshmallow extends Product {
    @Override
    public <R> R accept(ProductVisitor<R> visitor) {
        return visitor.visit(this);
    }
}
