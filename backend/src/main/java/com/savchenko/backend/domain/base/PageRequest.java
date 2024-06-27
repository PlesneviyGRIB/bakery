package com.savchenko.backend.domain.base;

import com.savchenko.backend.domain.filterQ.FilterQ;
import com.savchenko.backend.dto.base.PageRequestDto;
import com.savchenko.backend.dto.filter.FilterDto;

import java.util.function.Function;

public record PageRequest<Filter extends FilterQ>(Filter filterQ, Integer pageSize, Integer pageNumber) {
    public static <FDto extends FilterDto, FQ extends FilterQ> PageRequest<FQ> of(PageRequestDto<FDto> pageRequestDto, Function<FDto, FQ> filterMapper) {
        return new PageRequest<>(filterMapper.apply(pageRequestDto.filter), pageRequestDto.pageSize, pageRequestDto.pageNumber);
    }
}
