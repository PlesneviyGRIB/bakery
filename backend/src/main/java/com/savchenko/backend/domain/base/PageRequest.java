package com.savchenko.backend.domain.base;

import com.savchenko.backend.domain.filterQ.FilterQ;

public class PageRequest<Filter extends FilterQ> {
    public Filter filterQ;
    public Integer pageSize;
    public Integer pageNumber;
}
