package com.savchenko.backend.models.supportive;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseEntity <T> implements Comparable<T> {
    @Id
    @GeneratedValue
    private Long id;
}
