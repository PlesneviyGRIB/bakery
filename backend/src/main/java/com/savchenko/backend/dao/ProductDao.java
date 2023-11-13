package com.savchenko.backend.dao;

import com.querydsl.core.types.Predicate;
import com.savchenko.backend.dao.base.BaseDao;
import com.savchenko.backend.dao.base.PageData;
import com.savchenko.backend.model.Product;
import com.savchenko.backend.repository.ProductRepository;
import org.springframework.stereotype.Repository;

import static com.savchenko.backend.model.QProduct.product;

@Repository
public class ProductDao extends BaseDao<ProductRepository, Product> {
    public PageData<Product> products(Long pageNumber, Long pageSize, Predicate... predicates) {
        return getPage(query().selectFrom(product).select(product).where(predicates).orderBy(product.id.asc()), pageSize, pageNumber);
    }
}
