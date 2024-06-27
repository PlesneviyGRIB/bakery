package com.savchenko.backend.domain.compositePrimaryKey;

import com.savchenko.backend.domain.Product;
import com.savchenko.backend.domain.image.Image;
import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class ProductImagePrimaryKey {

    @ManyToOne
    private Product product;

    @ManyToOne
    private Image image;

}
