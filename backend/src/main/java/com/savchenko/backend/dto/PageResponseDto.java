package com.savchenko.backend.dto;

import java.util.List;
import java.util.function.Function;

public class PageResponseDto <T> {
    public List<T> list;
    public Long page;
    public Long count;
    public Long totalPages;
    public Long totalCount;

    public PageResponseDto(List<T> list, Long page, Long count, Long totalPages, Long totalCount){
        this.list = list;
        this.page = page;
        this.count = count;
        this.totalPages = totalPages;
        this.totalCount = totalCount;
    }

    public <V> PageResponseDto<V> map(Function<T, V> mapper) {
        return new PageResponseDto<>(
                list.stream().map(mapper).toList(),
                page, count, totalPages, totalCount
        );
    }
}
