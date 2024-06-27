package com.savchenko.backend.converter.base;

import com.google.gson.reflect.TypeToken;

import java.lang.reflect.ParameterizedType;

public abstract class DomainConverter<Entity, DtoLight, DtoFull extends DtoLight> {

    public DtoLight convertLight(Entity entity) {
        var dtoLight = createDtoLight(entity);

        convertLight(entity, dtoLight);

        return dtoLight;
    }

    public DtoFull convertFull(Entity entity) {
        var dtoFull = createDtoFull(entity);

        convertLight(entity, dtoFull);
        convertFull(entity, dtoFull);

        return dtoFull;
    }

    protected abstract void convertLight(Entity entity, DtoLight dto);

    protected abstract void convertFull(Entity entity, DtoFull dto);

    protected DtoLight createDtoLight(Entity entity) {
        return (DtoLight) newDtoInstanceFromClassParameter(false);
    }

    protected DtoFull createDtoFull(Entity entity) {
        return (DtoFull) newDtoInstanceFromClassParameter(true);
    }

    private Object newDtoInstanceFromClassParameter(boolean isFullDto) {
        try {
            var parameterIndex = isFullDto ? 2 : 1;
            var dtoType = ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[parameterIndex];

            return TypeToken.get(dtoType).getRawType().newInstance();
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

}
