package com.savchenko.backend.domain.product;

import com.savchenko.backend.domain.base.IdAndDatesEntity;
import com.savchenko.backend.domain.business.Cookie;
import com.savchenko.backend.domain.business.Marshmallow;
import com.savchenko.backend.domain.business.Pie;
import com.savchenko.backend.domain.image.ProductImage;
import com.savchenko.backend.domain.tag.Tag;
import com.savchenko.backend.domain.tag.Taggable;
import com.savchenko.backend.enums.ProductCategory;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
public abstract class Product extends IdAndDatesEntity implements Taggable {

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Long price;

    @Column(name = "weight")
    private Float weight;

    @OneToMany(mappedBy = "primaryKey.product")
    @Getter(value = AccessLevel.NONE)
    @Setter(value = AccessLevel.NONE)
    private List<ProductImage> productImages = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "product_tag", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    @Getter(value = AccessLevel.NONE)
    @Setter(value = AccessLevel.NONE)
    private List<Tag> tags = new ArrayList<>();

    public void addProductImage(ProductImage productImage) {
        productImage.setProduct(this);
        productImages.add(productImage);
    }

    public void removeProductImage(Long imageId) {
        productImages = productImages.stream().filter(image -> !image.getImage().getId().equals(imageId)).toList();
    }

    public List<ProductImage> getProductImages() {
        return new ArrayList<>(productImages);
    }

    @Override
    public void addTag(Tag tag) {
        tags.add(tag);
    }

    @Override
    public void removeTag(Long id) {
        tags = tags.stream().filter(t -> !t.getId().equals(id)).toList();
    }

    public List<Tag> getTags() {
        return new ArrayList<>(tags);
    }

    public interface Visitor<R> {

        R visit(Cookie dto);

        R visit(Pie dto);

        R visit(Marshmallow dto);

    }

    public abstract <R> R accept(Visitor<R> visitor);

    public static Product of(ProductCategory productCategory) {
        return switch (productCategory) {
            case COOKIE -> new Cookie();
            case PIE -> new Pie();
            case MARSHMALLOW -> new Marshmallow();
        };
    }

}
