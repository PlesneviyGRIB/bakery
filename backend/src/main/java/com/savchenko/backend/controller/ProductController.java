package com.savchenko.backend.controller;

import com.savchenko.backend.dto.*;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import com.savchenko.backend.dto.product.NewProductDto;
import com.savchenko.backend.dto.product.ProductDto;
import com.savchenko.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    public ProductDto newProduct(@RequestBody NewProductDto newProductDto) {
        return productService.createProduct(newProductDto);
    }

    @PostMapping("/list")
    public PageResponseDto<ProductDto> products(@RequestBody PageRequestDto<ProductFilterDto> pageRequestDto) {
        return productService.products(pageRequestDto);
    }
}
