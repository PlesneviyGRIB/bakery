package com.savchenko.backend.dao;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.JPQLTemplates;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.savchenko.backend.dto.PageRequestDto;
import com.savchenko.backend.dto.PageResponseDto;
import com.savchenko.backend.dto.filter.FilterDto;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public abstract class BaseDao<R extends JpaRepository<E, Long>, E> {

    @Autowired
    private R repository;

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
        public <T> PageResponseDto<T> execute(JPAQuery<T> query) {
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

    public E save(E entity){
        return repository.save(entity);
    }

    public Optional<E> findById(Long id){
        return repository.findById(id);
    }
}
