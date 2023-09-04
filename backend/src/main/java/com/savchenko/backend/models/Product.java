package com.savchenko.backend.models;

import com.savchenko.backend.interfaces.Tagged;

import java.time.Instant;
import java.util.List;

public abstract class Product extends BaseEntity<Product> implements Tagged {
    private Long price;
    private Long count;
    private Instant instant;
    private Long productionTime;
    private List<Image> images;
    private String title;
    private String description;

    @Override
    public int compareTo(Product product) {
        return 0;
    }
}
