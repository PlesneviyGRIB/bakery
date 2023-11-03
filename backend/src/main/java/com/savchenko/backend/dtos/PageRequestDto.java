package com.savchenko.backend.dtos;

import java.util.Optional;

public class PageRequestDto <T extends FilterDto>{
    public Optional<T> filter;
    public Long count;
    public Long page;
}
