package com.savchenko.backend.model;

import com.savchenko.backend.interfaces.Tagged;
import com.savchenko.backend.model.supportive.BaseEntity;
import com.savchenko.backend.model.supportive.Draft;
import com.savchenko.backend.utils.visitor.NewProductVisitor;
import com.savchenko.backend.utils.visitor.ProductVisitor;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

import java.time.Instant;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Product extends BaseEntity<Product> implements Tagged {
    private Long price;
    private Integer count;
    private Instant instant;
    private Integer productionTime;
    private String title;
    private String description;

    private Float weight;

    public Long getPrice() {
        return price;
    }

    public Integer getCount() {
        return count;
    }

    public Instant getInstant() {
        return instant;
    }

    public Integer getProductionTime() {
        return productionTime;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Float getWeight() {
        return weight;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public void setInstant(Instant instant) {
        this.instant = instant;
    }

    public void setProductionTime(Integer productionTime) {
        this.productionTime = productionTime;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    @Override
    public int compareTo(Product product) {
        return this.getId().compareTo(product.getId());
    }

    public abstract <R> R accept(ProductVisitor<R> visitor);
}
