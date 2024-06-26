package com.savchenko.backend.controller;

import com.savchenko.backend.dto.base.PageRequestDto;
import com.savchenko.backend.dto.base.PageResponseDto;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import com.savchenko.backend.dto.product.ProductCreateOrUpdateDto;
import com.savchenko.backend.dto.product.ProductFullDto;
import com.savchenko.backend.dto.product.ProductLightDto;
import com.savchenko.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/list")
    public PageResponseDto<ProductLightDto> products(@RequestBody @Validated PageRequestDto<ProductFilterDto> pageRequestDto) {
        return productService.products(pageRequestDto);
    }

    @GetMapping("/{id}")
    public ProductFullDto get(@PathVariable Long id) {
        return productService.get(id);
    }

    @PostMapping
    public ProductFullDto create(@RequestBody @Validated ProductCreateOrUpdateDto newProductDto) {
        return productService.create(newProductDto);
    }

    @PutMapping("/{id}")
    public ProductFullDto update(@PathVariable("id") Long id,
                                 @RequestBody @Validated ProductCreateOrUpdateDto newProductDto) {
        return productService.update(id, newProductDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }

}
