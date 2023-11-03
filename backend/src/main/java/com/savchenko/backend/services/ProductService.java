package com.savchenko.backend.services;

import com.savchenko.backend.daos.ProductDao;
import com.savchenko.backend.dtos.PageResponseDto;
import com.savchenko.backend.dtos.ProductDto;
import com.savchenko.backend.dtos.ProductFilterDto;
import com.savchenko.backend.services.supportive.BakeryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;
    @Transactional(readOnly = true)
    public PageResponseDto<ProductDto> products(ProductFilterDto filterDto) {
        return productDao.products(filterDto).map(BakeryMapper.ProductToDtoMapper);
    }
}
