package com.savchenko.backend.dtos;

import java.util.List;

public class PageResponseDto <T> {
    public List<T> list;
    public Long page;
    public Long count;
    public Long totalCount;
}
