package com.savchenko.backend.service;

import com.savchenko.backend.dao.ProductDao;
import com.savchenko.backend.dao.filterQ.ProductFilterQ;
import com.savchenko.backend.dto.PageRequestDto;
import com.savchenko.backend.dto.PageResponseDto;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import com.savchenko.backend.dto.product.NewProductDto;
import com.savchenko.backend.dto.product.ProductDto;
import com.savchenko.backend.utils.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;

import static com.savchenko.backend.service.supportive.BakeryConverter.pageDataToPageResponse;
import static com.savchenko.backend.service.supportive.BakeryMapper.NewProductDtoToModelMapper;
import static com.savchenko.backend.service.supportive.BakeryMapper.ProductToDtoMapper;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;

    @Transactional(readOnly = true)
    public PageResponseDto<ProductDto> products(PageRequestDto<ProductFilterDto> request) {
        var filter = new ProductFilterQ(request.filter);
        var pageData = productDao.products(
                request.pageNumber,
                request.pageSize,
                List.of(filter.buildPredicate()),
                filter.buildOrders());
        return pageDataToPageResponse(pageData, ProductToDtoMapper);
    }

    @Transactional(readOnly = true)
    public ProductDto get(Long id) {
        var product = productDao.findById(id).orElseThrow(() -> new NoSuchElementException(Message.format("NoSuchElement.product", id)));
        return ProductToDtoMapper.apply(product);
    }

    @Transactional
    public void delete(Long id) {
        if(!productDao.existsById(id)) {
            throw new NoSuchElementException(Message.format("NoSuchElement.product", id));
        }
        productDao.delete(id);
    }

    @Transactional
    public ProductDto createProduct(NewProductDto newProductDto) {
        var p = NewProductDtoToModelMapper.apply(newProductDto);
        p.setInstant(Instant.now());
        var product = productDao.save(p);

        return ProductToDtoMapper.apply(product);
    }
}
