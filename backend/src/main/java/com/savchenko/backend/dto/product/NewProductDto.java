package com.savchenko.backend.dto.product;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.savchenko.backend.enums.ProductCategory;
import com.savchenko.backend.exception.ValidationException;
import com.savchenko.backend.interfaces.Validatable;
import com.savchenko.backend.utils.visitor.NewProductVisitor;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "discriminator", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = NewCookieDto.class, name = "COOKIE"),
        @JsonSubTypes.Type(value = NewMarshmallowDto.class, name = "MARSHMALLOW"),
        @JsonSubTypes.Type(value = NewPieDto.class, name = "PIE")
})
public abstract class NewProductDto implements Validatable {
    public final ProductCategory discriminator;
    public Long price;
    public Integer count;
    public Integer productionTime;
    public String title;
    public String description;
    public Float weight;
    public Boolean orderAvailable;
    public List<Long> tagIds;

    public NewProductDto(ProductCategory discriminator) {
        this.discriminator = discriminator;
    }

    public abstract <R> R accept(NewProductVisitor<R> visitor);

    @Override
    public void validate(Map<String, Object> context) {
        if (Objects.isNull(price) || price < 0) {
            throw new ValidationException("invalid.newProduct.price", price);
        }
        if (Objects.isNull(count) || count < 0) {
            throw new ValidationException("invalid.newProduct.count", price);
        }
        if (productionTime != null && (productionTime < 0 || productionTime > 180)) {
            throw new ValidationException("invalid.newProduct.productionTime", price);
        }
        if (weight != null && (weight < 0)) {
            throw new ValidationException("invalid.newProduct.weight", price);
        }
        if (StringUtils.isBlank(title) || title.length() > 128) {
            throw new ValidationException("invalid.stringProperty", "title", 128, title.length());
        }
        if (StringUtils.isBlank(description) || description.length() > 8192) {
            throw new ValidationException("invalid.stringProperty", "description", 8192, description.length());
        }
        if (Objects.isNull(orderAvailable)) {
            throw new ValidationException("invalid.property.isNull", "order available");
        }
        var maxTagsCount = (Integer) context.get("tags.max.count");
        if(tagIds.size() > maxTagsCount) {
            throw new ValidationException("invalid.tag.count", maxTagsCount);
        }
    }
}
