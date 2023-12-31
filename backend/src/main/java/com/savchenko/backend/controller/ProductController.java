package com.savchenko.backend.controller;

import com.savchenko.backend.dto.*;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import com.savchenko.backend.dto.product.NewProductDto;
import com.savchenko.backend.dto.product.ProductDto;
import com.savchenko.backend.service.ProductService;
import com.savchenko.backend.utils.annotation.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    public ProductDto newProduct(@RequestBody @Validate NewProductDto newProductDto) {
        return productService.createProduct(newProductDto);
    }

    @PostMapping("/list")
    public PageResponseDto<ProductDto> products(@RequestBody PageRequestDto<ProductFilterDto> pageRequestDto) {
        return productService.products(pageRequestDto);
    }

    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable Long id) {
        return productService.get(id);
    }

    @PostMapping("/{id}/photo")
    public void addProductPhoto(@PathVariable("id") Long id,
                         @RequestParam(value = "title") String title,
                         @RequestParam(value = "description") String description,
                         @RequestParam(value = "isPreview") Boolean isPreview,
                         @RequestBody MultipartFile file) {
        productService.addPhoto(id, title, description, isPreview, file);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.delete(id);
    }
}
