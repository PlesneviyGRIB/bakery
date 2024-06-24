package com.savchenko.backend.converter.base;

import com.savchenko.backend.domain.base.BaseEntity;
import com.savchenko.backend.dto.base.BaseDto;

public abstract class BaseConverter<Entity extends BaseEntity, LightDto extends BaseDto, FullDto extends LightDto> extends DomainConverter<Entity, LightDto, FullDto> {

    @Override
    protected void convertLight(Entity entity, LightDto dto) {
        dto.id = entity.getId();
    }

}
