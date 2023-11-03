package com.savchenko.backend.service.supportive;

import com.savchenko.backend.dto.product.*;
import com.savchenko.backend.model.Product;
import com.savchenko.backend.model.business.Cookie;
import com.savchenko.backend.model.business.Marshmallow;
import com.savchenko.backend.model.business.Pie;
import com.savchenko.backend.utils.visitor.NewProductVisitor;
import com.savchenko.backend.utils.visitor.ProductVisitor;

import java.util.function.Function;

public class BakeryMapper {
    public static final Function<Product, ProductDto> ProductToDtoMapper = product ->
            product.accept(new ProductVisitor<ProductDto>() {
                @Override
                public ProductDto visit(Cookie cookie) {
                    return BakeryConverter.cookieModelToDto(cookie);
                }
                @Override
                public ProductDto visit(Pie pie) {
                    return BakeryConverter.pieModelToDto(pie);
                }
                @Override
                public ProductDto visit(Marshmallow marshmallow) {
                    return BakeryConverter.marshmallowModelToDto(marshmallow);
                }
            });

    public static final Function<NewProductDto, Product> NewProductDtoToModelMapper = productDto ->
            productDto.accept(new NewProductVisitor<Product>() {
                @Override
                public Product visit(NewCookieDto dto) {
                    return BakeryConverter.newCookieDtoToModel(dto);
                }
                @Override
                public Product visit(NewPieDto dto) {
                    return BakeryConverter.newPieDtoToModel(dto);
                }
                @Override
                public Product visit(NewMarshmallowDto dto) {
                    return BakeryConverter.newMarshmallowDtoToModel(dto);
                }
            });
}
