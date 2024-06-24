package com.savchenko.backend.domain.filterQ;

import com.querydsl.core.types.Predicate;

public interface FilterQ {
    Predicate buildPredicate();
}
