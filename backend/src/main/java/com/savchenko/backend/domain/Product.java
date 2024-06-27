package com.savchenko.backend.domain;

import com.savchenko.backend.domain.base.IdAndDatesEntity;
import com.savchenko.backend.domain.business.Cookie;
import com.savchenko.backend.domain.business.Marshmallow;
import com.savchenko.backend.domain.business.Pie;
import com.savchenko.backend.domain.image.ProductImage;
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
public abstract class Product extends IdAndDatesEntity {

    @Column(name = "price")
    private Long price;

    @Column(name = "count")
    private Integer count;

    @Column(name = "productionTime")
    private Integer productionTime;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "weight")
    private Float weight;

    @OneToMany(mappedBy = "primaryKey.product")
    @Getter(value = AccessLevel.NONE)
    @Setter(value = AccessLevel.NONE)
    private List<ProductImage> productImages = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "tag_intermediate", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<Tag> tags = new ArrayList<>();

    public interface Visitor<R> {

        R visit(Cookie dto);

        R visit(Pie dto);

        R visit(Marshmallow dto);

    }

    public abstract <R> R accept(Visitor<R> visitor);

//    @Override
//    public void applyTag(Tag tag) {
//        tags.add(tag);
//    }
//
//    @Override
//    public void removeTag(Long id) {
//        tags = tags.stream().filter(t -> !t.getId().equals(id)).toList();
//    }

    public void addProductImage(ProductImage productImage) {
        productImage.setProduct(this);
        productImages.add(productImage);
    }

    public void removeProductImage(Long imageId) {
        productImages = productImages.stream().filter(image -> !image.getImage().getId().equals(imageId)).toList();
    }

}
