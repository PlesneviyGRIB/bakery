package com.savchenko.backend.daos;

import com.savchenko.backend.dtos.PageRequestDto;
import com.savchenko.backend.dtos.PageResponseDto;
import com.savchenko.backend.dtos.ProductFilterDto;
import com.savchenko.backend.models.Product;
import com.savchenko.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;

import static com.savchenko.backend.models.QProduct.product;

@Component
public class ProductDao extends BaseDao {
    @Autowired
    private ProductRepository productRepository;

    public PageResponseDto<Product> products(PageRequestDto<ProductFilterDto> pageRequestDto){
        return PageRequest.execute(
                new BaseDao.QueryBuilder<>(queryFactory.selectFrom(product))
                        .withFilter(pageRequestDto.filter)
                        .withPagination(pageRequestDto)
                        .build()
        );
    }
}
