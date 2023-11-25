package com.savchenko.backend.service.supportive;

import com.savchenko.backend.dao.base.PageData;
import com.savchenko.backend.dto.PageResponseDto;
import com.savchenko.backend.dto.PhotoDto;
import com.savchenko.backend.dto.product.*;
import com.savchenko.backend.model.Photo;
import com.savchenko.backend.model.Product;
import com.savchenko.backend.model.business.Cookie;
import com.savchenko.backend.model.business.Marshmallow;
import com.savchenko.backend.model.business.Pie;
import com.savchenko.backend.utils.ServiceUtils;

import java.util.function.Function;
import java.util.stream.Collectors;

public class BakeryConverter {
    public static <M, D> PageResponseDto<D> pageDataToPageResponse(PageData<M> data, Function<M, D> mapper) {
        return new PageResponseDto<>(
                data.data().stream().map(mapper).collect(Collectors.toList()),
                data.pageNumber(), data.pageSize(), data.totalPages(), data.totalCount());
    }
}
