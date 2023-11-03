package com.savchenko.backend.daos;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.JPQLTemplates;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.savchenko.backend.dtos.PageFilterDto;
import com.savchenko.backend.dtos.PageResponseDto;
import com.savchenko.backend.dtos.ProductFilterDto;
import com.savchenko.backend.dtos.FilterDto;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceUnit;
import java.util.Optional;

@PersistenceUnit
public class BaseDao {
    static protected class FilterBuilder {
        static Predicate build(ProductFilterDto filter) {
            var predicate = build(filter);
            //Optional.ofNullable(filter.category).ifPresent(val -> predicate.and(product..eq(filter.category)));

            return predicate;
        }

        static Predicate build(FilterDto filter) {
            return new BooleanBuilder();
        }
    }

    static class QueryBuilder<T> {
        private final JPAQuery<T> query;

        public QueryBuilder(JPAQuery<T> jpaQuery) {
            this.query = jpaQuery;
        }

        public QueryBuilder<T> withFilter(FilterDto filter) {
            query.where(FilterBuilder.build(filter));
            if(filter instanceof PageFilterDto) {
                withPagination((PageFilterDto) filter);
            }
            return this;
        }

        public QueryBuilder<T> withPagination(PageFilterDto filter) {
            Optional
                    .ofNullable(filter.count)
                    .ifPresent(count -> {
                        query.limit(count);
                        Optional
                                .ofNullable(filter.page)
                                .ifPresent(page -> query.offset(page * count));
                    });
            return this;
        }

        public JPAQuery<T> build() {
            return query;
        }
    }

    static class PageRequest {
        static public <T> PageResponseDto<T> execute(JPAQuery<T> query){
            QueryResults<T> result = query.fetchResults();
            var data = result.getResults();
            var total = result.getTotal();
            var limit = result.getLimit();
            return new PageResponseDto<>(
                    data,
                    total / limit,
                    (long) data.size(),
                    total / limit + 1,
                    total
            );
        }
    }

    protected final JPAQueryFactory queryFactory;

    public BaseDao(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(JPQLTemplates.DEFAULT, entityManager);
    }
}
