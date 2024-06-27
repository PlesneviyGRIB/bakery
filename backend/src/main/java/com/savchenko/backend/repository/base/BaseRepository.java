package com.savchenko.backend.repository.base;

import com.querydsl.jpa.impl.JPAQuery;
import com.savchenko.backend.configuration.ApplicationContextProvider;
import com.savchenko.backend.domain.base.PageRequest;
import com.savchenko.backend.domain.filterQ.FilterQ;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface BaseRepository<Entity> extends JpaRepository<Entity, Long>, QuerydslPredicateExecutor<Entity> {

    default Entity getById(Long id) {
        return findById(id).orElseThrow(RuntimeException::new);
    }

    default Page<Entity> getPage(PageRequest<FilterQ> pageRequest) {
        return findAll(pageRequest.filterQ.buildPredicate(), Pageable.ofSize(pageRequest.pageSize).withPage(pageRequest.pageNumber));
    }

    default EntityManager getEntityManager() {
        return ApplicationContextProvider.getBean(EntityManager.class);
    }

    default JPAQuery<Entity> query() {
        return new JPAQuery<>(getEntityManager());
    }

}
