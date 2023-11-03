package com.savchenko.backend.service;

import com.savchenko.backend.dao.ProductDao;
import com.savchenko.backend.dto.PageRequestDto;
import com.savchenko.backend.dto.PageResponseDto;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import com.savchenko.backend.dto.product.NewProductDto;
import com.savchenko.backend.dto.product.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.savchenko.backend.service.supportive.BakeryMapper.NewProductDtoToProductMapper;
import static com.savchenko.backend.service.supportive.BakeryMapper.ProductToDtoMapper;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;

    @Transactional(readOnly = true)
    public PageResponseDto<ProductDto> products(PageRequestDto<ProductFilterDto> pageRequestDto) {
        return productDao.products(pageRequestDto).map(ProductToDtoMapper);
    }

    @Transactional
    public ProductDto createProduct(NewProductDto newProductDto) {
        return ProductToDtoMapper.apply(productDao.save(NewProductDtoToProductMapper.apply(newProductDto)));
    }
}
