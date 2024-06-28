package com.savchenko.backend.dto.product;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.savchenko.backend.dto.base.BaseDto;
import com.savchenko.backend.enums.ProductCategory;

import java.util.List;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "productCategory", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = CookieUpdateDto.class, name = "COOKIE"),
        @JsonSubTypes.Type(value = PieUpdateDto.class, name = "PIE"),
        @JsonSubTypes.Type(value = MarshmallowUpdateDto.class, name = "MARSHMALLOW"),
})
public abstract class ProductCreateOrUpdateDto extends BaseDto {

    public ProductCategory productCategory;

    public Long price;

    public String title;

    public String description;

    public Float weight;

    public List<Long> productImageIds;

    public List<Long> tagIds;

    public interface Visitor<T> {

        T visit(CookieUpdateDto dto);

        T visit(PieUpdateDto dto);

        T visit(MarshmallowUpdateDto dto);

    }

    public abstract <T> T accept(Visitor<T> visitor);

}
