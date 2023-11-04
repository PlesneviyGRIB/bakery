package com.savchenko.backend.dto;

import com.savchenko.backend.dto.filter.FilterDto;

public class PageRequestDto<T extends FilterDto> {
    public T filter;
    public Long pageSize;
    public Long pageNumber;
}
