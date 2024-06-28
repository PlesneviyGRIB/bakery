package com.savchenko.backend.service;

import com.savchenko.backend.converter.ProductConverter;
import com.savchenko.backend.converter.utils.ConverterUtils;
import com.savchenko.backend.domain.base.PageRequest;
import com.savchenko.backend.domain.business.Cookie;
import com.savchenko.backend.domain.business.Marshmallow;
import com.savchenko.backend.domain.business.Pie;
import com.savchenko.backend.domain.filterQ.ProductFilterQ;
import com.savchenko.backend.domain.product.Product;
import com.savchenko.backend.dto.base.PageRequestDto;
import com.savchenko.backend.dto.base.PageResponseDto;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import com.savchenko.backend.dto.product.*;
import com.savchenko.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    private final ProductConverter productConverter;

    @Transactional(readOnly = true)
    public PageResponseDto<ProductLightDto> products(PageRequestDto<ProductFilterDto> pageRequestDto) {

        var pageRequest = PageRequest.of(pageRequestDto, ProductFilterQ::new);
        var productPage = productRepository.getPage(pageRequest);

        return ConverterUtils.convertPage(productPage, productConverter::convertLight);
    }

    @Transactional(readOnly = true)
    public ProductFullDto get(Long id) {

        var product = productRepository.getById(id);

        return productConverter.convertFull(product);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public ProductFullDto create(ProductCreateOrUpdateDto createDto) {

        var product = Product.of(createDto.productCategory);

        updateProduct(createDto, product);

        var savedProduct = productRepository.save(product);

        return productConverter.convertFull(savedProduct);
    }

    public ProductFullDto update(Long id, ProductCreateOrUpdateDto updateDto) {

        var product = productRepository.getById(id);

        updateProduct(updateDto, product);

        var savedProduct = productRepository.save(product);

        return productConverter.convertFull(savedProduct);
    }

    private void updateProduct(ProductCreateOrUpdateDto updateDto, Product product) {

        product.setTitle(updateDto.title);
        product.setDescription(updateDto.description);
        product.setPrice(updateDto.price);
        product.setWeight(updateDto.weight);

        updateDto.accept(new ProductCreateOrUpdateDto.Visitor<Void>() {

            @Override
            public Void visit(CookieUpdateDto dto) {
                var cookie = (Cookie) product;
                return null;
            }

            @Override
            public Void visit(PieUpdateDto dto) {
                var pie = (Pie) product;
                return null;
            }

            @Override
            public Void visit(MarshmallowUpdateDto dto) {
                var marshmallow = (Marshmallow) product;
                return null;
            }

        });
    }

}
