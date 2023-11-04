package com.savchenko.backend.dao.base;

import java.util.List;

public record PageData<T>(List<T> data, Long pageNumber, Long pageSize, Long totalPages, Long totalCount) {

    public Integer getCount() {
        return data.size();
    }
}

