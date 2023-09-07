package com.savchenko.backend.models;

import com.savchenko.backend.interfaces.Tagged;
import com.savchenko.backend.models.supportive.Draft;
import jakarta.persistence.Column;
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
    @Column(name = "production_time")
    private Integer productionTime;
    //private List<Image> images;
    private String title;
    private String description;

    @Override
    public int compareTo(Product product) {
        return 0;
    }
}
