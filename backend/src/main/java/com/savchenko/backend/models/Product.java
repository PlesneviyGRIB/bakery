package com.savchenko.backend.models;

import com.savchenko.backend.interfaces.Tagged;
import com.savchenko.backend.models.supportive.Draft;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

import java.time.Instant;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Product extends Draft<Product> implements Tagged {
    private Long price;
    private Integer count;
    private Instant instant;
    private Integer productionTime;
    private String title;
    private String description;

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

    @Override
    public int compareTo(Product product) {
        return 0;
    }
}
