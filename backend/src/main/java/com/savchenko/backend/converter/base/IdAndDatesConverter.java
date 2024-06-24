package com.savchenko.backend.converter.base;

import com.savchenko.backend.domain.base.IdAndDatesEntity;
import com.savchenko.backend.dto.base.IdAndDatesDto;

public abstract class IdAndDatesConverter<Entity extends IdAndDatesEntity, LightDto extends IdAndDatesDto, FullDto extends LightDto> extends BaseConverter<Entity, LightDto, FullDto> {

    @Override
    protected void convertLight(Entity entity, LightDto dto) {
        super.convertLight(entity, dto);
        dto.createdAt = entity.getCreatedAt().toString();
        dto.updatedAt = entity.getUpdatedAt().toString();
    }

}
