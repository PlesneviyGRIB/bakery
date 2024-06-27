package com.savchenko.backend.converter;

import com.savchenko.backend.converter.base.IdAndDatesConverter;
import com.savchenko.backend.domain.business.Cookie;
import com.savchenko.backend.domain.business.Marshmallow;
import com.savchenko.backend.domain.business.Pie;
import com.savchenko.backend.domain.product.Product;
import com.savchenko.backend.dto.product.*;
import com.savchenko.backend.enums.ProductCategory;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter extends IdAndDatesConverter<Product, ProductLightDto, ProductFullDto> {

    @Override
    protected void convertLight(Product entity, ProductLightDto dto) {
        super.convertLight(entity, dto);

        dto.productCategory = ProductCategory.from(entity);
        dto.title = entity.getTitle();
        dto.description = entity.getDescription();
        dto.price = entity.getPrice();
        dto.weight = entity.getWeight();
    }

    @Override
    protected void convertFull(Product product, ProductFullDto fullDto) {
        product.accept(new Product.Visitor<Void>() {

            @Override
            public Void visit(Cookie dto) {
                var cookieDto = (CookieDto) fullDto;
                return null;
            }

            @Override
            public Void visit(Pie dto) {
                var pieDto = (PieDto) fullDto;
                return null;
            }

            @Override
            public Void visit(Marshmallow dto) {
                var marshmallowDto = (MarshmallowDto) fullDto;
                return null;
            }

        });
    }

    @Override
    protected ProductFullDto createDtoFull(Product product) {
        return ProductFullDto.of(ProductCategory.from(product));
    }

}
