package com.savchenko.backend.dto.product;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.savchenko.backend.enums.ProductCategory;
import com.savchenko.backend.utils.visitor.NewProductVisitor;

import java.util.Optional;

@JsonSubTypes({
        @JsonSubTypes.Type(value = NewCookieDto.class),
        @JsonSubTypes.Type(value = NewMarshmallowDto.class),
        @JsonSubTypes.Type(value = NewPieDto.class)
})
public abstract class NewProductDto {
    private final ProductCategory discriminator;
    public Long price;
    public Integer count;
    public Optional<Integer> productionTime;
    public String title;
    public String description;
    public Optional<Float> weight;
    public Boolean orderAvailable;

    public NewProductDto(ProductCategory discriminator){
        this.discriminator = discriminator;
    }

    public abstract <R> R accept(NewProductVisitor<R> visitor);
}
