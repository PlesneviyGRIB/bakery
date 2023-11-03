package com.savchenko.backend.daos;

import com.savchenko.backend.dtos.PageResponseDto;
import com.savchenko.backend.dtos.ProductFilterDto;
import com.savchenko.backend.models.Product;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceUnit;

import static com.savchenko.backend.models.QProduct.product;

@Component
@PersistenceUnit
public class ProductDao extends BaseDao {

    private ProductDao(EntityManager entityManager){
        super(entityManager);
    }
    public PageResponseDto<Product> products(ProductFilterDto filter){
        return PageRequest.execute(
                new QueryBuilder<>(queryFactory.selectFrom(product))
                        .withFilter(filter)
                        .build()
        );
    }
}
