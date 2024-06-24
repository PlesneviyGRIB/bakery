package com.savchenko.backend.domain.business;

import com.savchenko.backend.domain.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "cookie")
@Getter
public class Cookie extends Product {

    @Override
    public <R> R accept(Product.Visitor<R> visitor) {
        return visitor.visit(this);
    }

}
