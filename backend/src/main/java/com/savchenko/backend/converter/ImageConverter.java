package com.savchenko.backend.converter;

import com.savchenko.backend.converter.base.IdAndDatesConverter;
import com.savchenko.backend.domain.image.Image;
import com.savchenko.backend.dto.image.ImageDto;
import org.springframework.stereotype.Component;

@Component
public class ImageConverter extends IdAndDatesConverter<Image, ImageDto, ImageDto> {

    @Override
    protected void convertLight(Image entity, ImageDto dto) {
        super.convertLight(entity, dto);

        dto.title = entity.getTitle();
        dto.description = entity.getDescription();
    }

    @Override
    protected void convertFull(Image image, ImageDto dto) {

    }

}
