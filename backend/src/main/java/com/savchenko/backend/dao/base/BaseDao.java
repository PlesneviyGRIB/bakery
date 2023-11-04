package com.savchenko.backend.dao.base;

import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.JPQLTemplates;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public abstract class BaseDao<R extends JpaRepository<E, Long>, E> {

    @Autowired
    private R repository;

    @PersistenceContext
    private EntityManager entityManager;

    public JPAQueryFactory query() {
        return new JPAQueryFactory(JPQLTemplates.DEFAULT, entityManager);
    }

    public E save(E entity) {
        return repository.save(entity);
    }

    public Optional<E> findById(Long id) {
        return repository.findById(id);
    }

    public void delete(E entity) {
        repository.delete(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public void existsById(Long id) {
        repository.existsById(id);
    }

    public void flush() {
        repository.flush();
    }

    public E find(JPAQuery<E> query) {
        return query.fetchOne();
    }

    public PageData<E> getPage(JPQLQuery<E> query, Long pageSize, Long pageNumber) {
        var result = query
                .offset(pageSize * pageNumber)
                .limit(pageSize)
                .fetchResults();

        return new PageData<>(result.getResults(), pageNumber, pageSize, Math.ceilDiv(result.getTotal(), pageSize), result.getTotal());
    }

}
