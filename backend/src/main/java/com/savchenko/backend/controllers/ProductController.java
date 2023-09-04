package com.savchenko.backend.controllers;

import com.savchenko.backend.dtos.PageResponseDto;
import com.savchenko.backend.dtos.ProductFilterDto;
import com.savchenko.backend.models.Product;
import com.savchenko.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/products")
    public PageResponseDto<Product> products(@RequestBody ProductFilterDto filterDto) {
        return null;
    }
}
