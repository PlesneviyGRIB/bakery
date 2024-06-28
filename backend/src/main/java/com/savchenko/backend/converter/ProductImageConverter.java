package com.savchenko.backend.converter;

import com.savchenko.backend.converter.base.DomainConverter;
import com.savchenko.backend.domain.image.ProductImage;
import com.savchenko.backend.dto.image.ProductImageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductImageConverter extends DomainConverter<ProductImage, ProductImageDto, ProductImageDto> {

    private final ImageConverter imageConverter;

    @Override
    protected void convertLight(ProductImage entity, ProductImageDto dto) {
        dto.image = imageConverter.convertLight(entity.getImage());
        dto.isPreview = entity.getIsPreview();
    }

    @Override
    protected void convertFull(ProductImage productImage, ProductImageDto dto) {

    }

}
