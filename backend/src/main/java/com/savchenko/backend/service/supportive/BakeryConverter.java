package com.savchenko.backend.service.supportive;

import com.savchenko.backend.dao.base.PageData;
import com.savchenko.backend.dto.PageResponseDto;
import com.savchenko.backend.dto.TagDto;
import com.savchenko.backend.model.Tag;

import java.util.function.Function;
import java.util.stream.Collectors;

public class BakeryConverter {
    public static <M, D> PageResponseDto<D> pageDataToPageResponse(PageData<M> data, Function<M, D> mapper) {
        return new PageResponseDto<>(
                data.data().stream().map(mapper).collect(Collectors.toList()),
                data.pageNumber(), data.pageSize(), data.totalPages(), data.totalCount());
    }

    public static TagDto tagModelToDto(Tag tag, Integer usages){
        var dto = new TagDto();
        dto.id = tag.getId();
        dto.title = tag.getTitle();
        dto.usages = usages;
        return dto;
    }
}
