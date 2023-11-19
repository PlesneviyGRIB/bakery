package com.savchenko.backend.dao;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.savchenko.backend.dao.base.BaseDao;
import com.savchenko.backend.dao.base.PageData;
import com.savchenko.backend.model.Product;
import com.savchenko.backend.repository.ProductRepository;
import com.savchenko.backend.utils.Message;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.NoSuchElementException;

import static com.savchenko.backend.model.QProduct.product;

@Repository
public class ProductDao extends BaseDao<ProductRepository, Product> {

    public Product getById(Long id){
        return findById(id).orElseThrow(() -> new NoSuchElementException(Message.format("NoSuchElement.product", id)));
    }

    public PageData<Product> products(Long pageNumber, Long pageSize, List<Predicate> predicates, List<OrderSpecifier<?>> orders) {
        if (orders.isEmpty()) {
            orders = List.of(product.id.asc());
        }
        return getPage(
                query().selectFrom(product)
                        .select(product)
                        .where(predicates.toArray(Predicate[]::new))
                        .orderBy(orders.toArray(OrderSpecifier[]::new)),
                pageSize,
                pageNumber
        );
    }
}
