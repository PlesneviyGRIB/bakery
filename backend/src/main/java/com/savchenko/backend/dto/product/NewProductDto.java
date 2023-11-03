package com.savchenko.backend.dto.product;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.savchenko.backend.enums.ProductCategory;
import com.savchenko.backend.utils.visitor.NewProductVisitor;

import java.util.Optional;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "discriminator", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = NewCookieDto.class, name = "COOKIE"),
        @JsonSubTypes.Type(value = NewMarshmallowDto.class, name = "MARSHMALLOW"),
        @JsonSubTypes.Type(value = NewPieDto.class, name = "PIE")
})
public abstract class NewProductDto {
    public final ProductCategory discriminator;
    public Long price;
    public Integer count;
    private Integer productionTime;
    public String title;
    public String description;
    private Float weight;
    public Boolean orderAvailable;

    public Optional<Integer> getProductionTime() {
        return Optional.ofNullable(productionTime);
    }

    public Optional<Float> getWeight() {
        return Optional.ofNullable(weight);
    }

    public NewProductDto(ProductCategory discriminator){
        this.discriminator = discriminator;
    }

    public abstract <R> R accept(NewProductVisitor<R> visitor);
}
