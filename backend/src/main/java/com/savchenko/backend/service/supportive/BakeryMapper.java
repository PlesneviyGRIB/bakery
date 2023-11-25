package com.savchenko.backend.service.supportive;

import com.savchenko.backend.dto.product.*;
import com.savchenko.backend.model.Product;
import com.savchenko.backend.model.business.Cookie;
import com.savchenko.backend.model.business.Marshmallow;
import com.savchenko.backend.model.business.Pie;
import com.savchenko.backend.utils.visitor.NewProductVisitor;
import com.savchenko.backend.utils.visitor.ProductVisitor;

import java.util.function.BiFunction;
import java.util.function.Function;

public class BakeryMapper {
    public static final BiFunction<Product, Boolean, ProductDto> ProductToDtoMapper = (product, light) ->
            product.accept(new ProductVisitor<ProductDto>() {
                private final ProductConverter converter = new ProductConverter(light);
                @Override
                public ProductDto visit(Cookie cookie) {
                    return converter.cookieModelToDto(cookie);
                }
                @Override
                public ProductDto visit(Pie pie) {
                    return converter.pieModelToDto(pie);
                }
                @Override
                public ProductDto visit(Marshmallow marshmallow) {
                    return converter.marshmallowModelToDto(marshmallow);
                }
            });

    public static final Function<NewProductDto, Product> NewProductDtoToModelMapper = productDto ->
            productDto.accept(new NewProductVisitor<Product>() {
                private final ProductConverter converter = new ProductConverter();
                @Override
                public Product visit(NewCookieDto dto) {
                    return converter.newCookieDtoToModel(dto);
                }
                @Override
                public Product visit(NewPieDto dto) {
                    return converter.newPieDtoToModel(dto);
                }
                @Override
                public Product visit(NewMarshmallowDto dto) {
                    return converter.newMarshmallowDtoToModel(dto);
                }
            });
}
