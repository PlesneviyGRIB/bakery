package com.savchenko.backend.converter.base;

import com.savchenko.backend.domain.base.PagedData;
import com.savchenko.backend.dto.PageResponseDto;

import java.util.function.Function;
import java.util.stream.Collectors;

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

    private DtoLight createDtoLight(Entity entity) {



        return null;
    }

    private DtoFull createDtoFull(Entity entity) {
        return null;
    }

    public static <M, D> PageResponseDto<D> pagedDataToPageResponse(PagedData<M> data, Function<M, D> mapper) {
        return new PageResponseDto<>(
                data.data().stream().map(mapper).collect(Collectors.toList()),
                data.pageNumber(), data.pageSize(), data.totalPages(), data.totalCount()
        );
    }

}
