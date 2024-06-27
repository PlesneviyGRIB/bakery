package com.savchenko.backend.converter;

import com.savchenko.backend.converter.base.IdAndDatesConverter;
import com.savchenko.backend.domain.Product;
import com.savchenko.backend.dto.product.ProductFullDto;
import com.savchenko.backend.dto.product.ProductLightDto;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter extends IdAndDatesConverter<Product, ProductLightDto, ProductFullDto> {

    @Override
    protected void convertFull(Product product, ProductFullDto dto) {

    }

    @Override
    protected void convertLight(Product entity, ProductLightDto dto) {
        super.convertLight(entity, dto);
    }
}
