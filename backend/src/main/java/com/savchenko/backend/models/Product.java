package com.savchenko.backend.models;

import com.savchenko.backend.interfaces.Tagged;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

import java.time.Instant;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Product extends BaseEntity<Product> implements Tagged {
    private Long price;
    private Long count;
    private Instant instant;
    private Long productionTime;
    //private List<Image> images;
    private String title;
    private String description;

    @Override
    public int compareTo(Product product) {
        return 0;
    }
}
