package com.savchenko.backend.domain.base;

import com.savchenko.backend.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;

@MappedSuperclass
@Getter
public class IdAndDatesAndOwnerEntity extends IdAndDatesEntity {

    @Column(name = "owner_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User owner;

    @PrePersist
    void prePersist() {
        super.prePersist();
        owner = null;
    }

}
