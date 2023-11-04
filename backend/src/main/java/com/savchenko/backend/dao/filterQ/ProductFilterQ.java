package com.savchenko.backend.dao.filterQ;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.JPAExpressions;
import com.savchenko.backend.dto.filter.ProductFilterDto;

import java.util.Optional;

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

}
