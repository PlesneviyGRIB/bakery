package com.savchenko.backend.models.business;

import com.savchenko.backend.models.Product;
import jakarta.persistence.Entity;

@Entity
public class Cookie extends Product {
    private String size;

    @Override
    public void checkDraft() {
        this.draft = false;
    }
}
