package com.savchenko.backend.domain.base;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;

import java.time.Instant;

@MappedSuperclass
@Getter
public class IdAndDatesEntity extends BaseEntity {

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    void prePersist() {
        var instant = Instant.now();
        createdAt = instant;
        updatedAt = instant;
    }

    @PreUpdate
    private void preUpdate() {
        updatedAt = Instant.now();
    }

}
