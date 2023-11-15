package com.savchenko.backend.dao.filterQ;

import com.fasterxml.jackson.core.type.TypeReference;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.JPAExpressions;
import com.savchenko.backend.dto.filter.ProductFilterDto;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.stream.Collectors;

import static com.savchenko.backend.model.QProduct.product;
import static com.savchenko.backend.model.business.QCookie.cookie;
import static com.savchenko.backend.model.business.QMarshmallow.marshmallow;
import static com.savchenko.backend.model.business.QPie.pie;

public class ProductFilterQ {
    private final ProductFilterDto filter;

    public ProductFilterQ(ProductFilterDto filter) {
        this.filter = filter;
    }

    public Predicate buildPredicate() {
        var predicate = new BooleanBuilder();

        Optional
                .ofNullable(filter.category)
                .ifPresent(cat -> {
                    var subQuery = JPAExpressions
                            .selectFrom(product)
                            .select(product.id);

                    switch (filter.category) {
                        case PIE -> subQuery.join(pie).on(pie.id.eq(product.id));
                        case MARSHMALLOW -> subQuery.join(marshmallow).on(marshmallow.id.eq(product.id));
                        case COOKIE -> subQuery.join(cookie).on(cookie.id.eq(product.id));
                    }

                    predicate.and(product.id.in(subQuery));
                });

        return predicate;
    }

    public List<OrderSpecifier<?>> buildOrders() {
        var orders = filter.order;
        var orderBy = new HashSet<>();

        return orders.stream()
                .filter(o -> {
                    var contains = orderBy.contains(o.order);
                    orderBy.add(o.order);
                    return !contains;
                })
                .map(o -> {
                    BiFunction<Path<?>, Boolean, OrderSpecifier<?>> orderProducer = (path, sort) -> new OrderSpecifier(sort ? Order.ASC : Order.DESC, path);
                    return switch (o.order) {
                        case TITLE -> orderProducer.apply(product.title, o.state);
                        case PRICE -> orderProducer.apply(product.price, o.state);
                        case COUNT -> orderProducer.apply(product.count, o.state);
                        case PRODUCTION_TIME -> orderProducer.apply(product.productionTime, o.state);
                        case WEIGHT -> orderProducer.apply(product.weight, o.state);
                        case CREATION_TIME -> orderProducer.apply(product.instant, o.state);
                    };
                }).collect(Collectors.toList());
    }

}
