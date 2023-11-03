package com.savchenko.backend.dao;

import com.savchenko.backend.dto.PageRequestDto;
import com.savchenko.backend.dto.PageResponseDto;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import com.savchenko.backend.model.Product;
import com.savchenko.backend.repository.ProductRepository;
import org.springframework.stereotype.Repository;


import static com.savchenko.backend.model.QProduct.product;

@Repository
public class ProductDao extends BaseDao<ProductRepository, Product> {

    public PageResponseDto<Product> products(PageRequestDto<ProductFilterDto> pageRequestDto){
        return new PageRequest().execute(
                new BaseDao.QueryBuilder<>(queryFactory.selectFrom(product))
                        .withFilter(pageRequestDto.filter)
                        .withPagination(pageRequestDto)
                        .build()
        );
    }
}
