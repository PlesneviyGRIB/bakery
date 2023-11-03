package com.savchenko.backend.dao;

import com.savchenko.backend.dto.PageRequestDto;
import com.savchenko.backend.dto.PageResponseDto;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import com.savchenko.backend.model.Product;
import com.savchenko.backend.repository.ProductRepository;
import org.springframework.stereotype.Component;

import static com.savchenko.backend.models.QProduct.product;

@Component
public class ProductDao extends BaseDao<ProductRepository, Product> {
    public PageResponseDto<Product> products(PageRequestDto<ProductFilterDto> pageRequestDto){
        return PageRequest.execute(
                new BaseDao.QueryBuilder<>(queryFactory.selectFrom(product))
                        .withFilter(pageRequestDto.filter)
                        .withPagination(pageRequestDto)
                        .build()
        );
    }
}
