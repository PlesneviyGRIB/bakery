package com.savchenko.backend.services;

import com.savchenko.backend.dtos.PageResponseDto;
import com.savchenko.backend.dtos.ProductFilterDto;
import com.savchenko.backend.models.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {
    @Transactional(readOnly = true)
    public PageResponseDto<Product> products(ProductFilterDto filterDto) {
        return new PageResponseDto<>();
    }
}
