package com.savchenko.backend.service.supportive;

import com.savchenko.backend.dto.product.*;
import com.savchenko.backend.model.Product;
import com.savchenko.backend.model.business.Cookie;
import com.savchenko.backend.model.business.Marshmallow;
import com.savchenko.backend.model.business.Pie;
import com.savchenko.backend.utils.visitor.NewProductVisitor;
import com.savchenko.backend.utils.visitor.ProductVisitor;

import java.time.Instant;
import java.util.function.Function;

public class BakeryMapper {
    public static final Function<Product, ProductDto> ProductToDtoMapper = product ->
            product.accept(new ProductVisitor<ProductDto>() {
                @Override
                public ProductDto visit(Cookie cookie) {
                    var dto = new CookieDto();
                    convertBase(dto);
                    return dto;
                }

                @Override
                public ProductDto visit(Pie pie) {
                    var dto = new PieDto();
                    convertBase(dto);
                    return dto;
                }

                @Override
                public ProductDto visit(Marshmallow marshmallow) {
                    var dto = new MarshmallowDto();
                    convertBase(dto);
                    return dto;
                }

                private void convertBase(ProductDto dto) {
                    dto.count = product.getCount();
                    dto.description = product.getDescription();
                    dto.productionTime = product.getProductionTime();
                    dto.instant = product.getInstant();
                    dto.price = product.getPrice();
                    dto.title = product.getTitle();
                }
            });

    public static final Function<NewProductDto, Product> NewProductDtoToProductMapper = productDto ->
            productDto.accept(new NewProductVisitor<Product>() {
                @Override
                public Product visit(NewCookieDto dto) {
                    var product = new Cookie();
                    convertBase(product);
                    return product;
                }

                @Override
                public Product visit(NewPieDto dto) {
                    var product = new Pie();
                    convertBase(product);
                    return product;
                }

                @Override
                public Product visit(NewMarshmallowDto dto) {
                    var product = new Marshmallow();
                    convertBase(product);
                    return product;
                }

                private void convertBase(Product product) {
                    product.setCount(productDto.count);
                    product.setDescription(productDto.description);
                    product.setPrice(productDto.price);
                    product.setTitle(productDto.title);
                    product.setProductionTime(productDto.productionTime.orElse(null));
                    product.setInstant(Instant.now());
                }
            });
}
