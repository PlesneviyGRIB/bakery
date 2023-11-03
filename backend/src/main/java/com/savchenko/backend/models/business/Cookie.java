package com.savchenko.backend.models.business;

import com.savchenko.backend.enums.ProductSize;
import com.savchenko.backend.models.Product;
import jakarta.persistence.Entity;

@Entity
public class Cookie extends Product {
    private ProductSize size;

    @Override
    public void checkDraft() {
        this.draft = false;
    }
}
