package com.savchenko.backend.domain.business;

import com.savchenko.backend.domain.product.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "Pie")
@Getter
public class Pie extends Product {

    @Override
    public <R> R accept(Product.Visitor<R> visitor) {
        return visitor.visit(this);
    }

}
