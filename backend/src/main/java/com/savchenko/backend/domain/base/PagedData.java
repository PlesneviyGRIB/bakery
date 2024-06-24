package com.savchenko.backend.domain.base;

import java.util.List;

public record PagedData<T>(List<T> data, Long pageNumber, Long pageSize, Long totalPages, Long totalCount) {

    public Integer getCount() {
        return data.size();
    }
}

