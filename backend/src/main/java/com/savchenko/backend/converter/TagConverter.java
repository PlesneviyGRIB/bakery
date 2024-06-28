package com.savchenko.backend.converter;

import com.savchenko.backend.converter.base.IdAndDatesConverter;
import com.savchenko.backend.domain.tag.Tag;
import com.savchenko.backend.dto.TagDto;
import org.springframework.stereotype.Component;

@Component
public class TagConverter extends IdAndDatesConverter<Tag, TagDto, TagDto> {

    @Override
    protected void convertLight(Tag entity, TagDto dto) {
        super.convertLight(entity, dto);

        dto.category = entity.getCategory();
        dto.title = entity.getTitle();
    }

    @Override
    protected void convertFull(Tag tag, TagDto dto) {

    }

}
