package com.savchenko.backend.domain.base;

import jakarta.persistence.*;
import lombok.Getter;

@MappedSuperclass
@Getter
public abstract class BaseEntity implements Comparable<BaseEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Override
    public int compareTo(BaseEntity entityId) {
        return this.id.compareTo(entityId.id);
    }

}
