package com.savchenko.backend.daos;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.JPQLTemplates;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.savchenko.backend.dtos.FilterDto;
import com.savchenko.backend.dtos.PageRequestDto;
import com.savchenko.backend.dtos.PageResponseDto;
import com.savchenko.backend.dtos.ProductFilterDto;
import jakarta.annotation.PostConstruct;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;
import java.util.Optional;

@PersistenceUnit
public abstract class BaseDao {
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

        public QueryBuilder<T> withFilter(Optional<? extends FilterDto> filterOpt) {
            filterOpt.ifPresent(filter -> query.where(FilterBuilder.build(filter)));
            return this;
        }

        public <R extends FilterDto> QueryBuilder<T> withPagination(PageRequestDto<R> pageRequestDto) {
            query
                    .limit(pageRequestDto.count)
                    .offset(pageRequestDto.page * pageRequestDto.count);
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

    @PersistenceContext
    private EntityManager entityManager;
    protected JPAQueryFactory queryFactory;

    @PostConstruct
    private void postConstruct(){
        this.queryFactory = new JPAQueryFactory(JPQLTemplates.DEFAULT, entityManager);
    }
}
