package com.savchenko.backend.domain.image;

import com.savchenko.backend.domain.product.Product;
import com.savchenko.backend.domain.compositePrimaryKey.ProductImagePrimaryKey;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product_image")
@AssociationOverrides({
        @AssociationOverride(name = "primaryKey.product", joinColumns = @JoinColumn(name = "product_id")),
        @AssociationOverride(name = "primaryKey.image", joinColumns = @JoinColumn(name = "image_id"))
})
@Getter
@Setter
public class ProductImage {

    @EmbeddedId
    @Getter(value = AccessLevel.NONE)
    @Setter(value = AccessLevel.NONE)
    private ProductImagePrimaryKey primaryKey;

    @Column(name = "is_preview")
    private Boolean isPreview;

    public Product getProduct() {
        return primaryKey.getProduct();
    }

    public Image getImage() {
        return primaryKey.getImage();
    }

    public void setProduct(Product product) {
        primaryKey.setProduct(product);
    }

    public void setImage(Image image) {
        primaryKey.setImage(image);
    }

}
