package com.savchenko.backend.domain;

import com.savchenko.backend.domain.base.IdAndDatesEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_details")
@Getter
@Setter
public class UserDetails extends IdAndDatesEntity {

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "nickname")
    private String nickname;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;
}
