package com.savchenko.backend.dto;

import com.savchenko.backend.dto.filter.FilterDto;

import java.util.Optional;

public class PageRequestDto <T extends FilterDto>{
    public Optional<T> filter;
    public Long count;
    public Long page;
}
