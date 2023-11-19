package com.savchenko.backend.model.supportive;

import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseEntity <T> implements Comparable<T> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Override
    public int compareTo(@Nonnull T t) {
        var entity = (BaseEntity<?>) t;
        return this.id.compareTo(entity.getId());
    }

    public Long getId() {
        return id;
    }
}
