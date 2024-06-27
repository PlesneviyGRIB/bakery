package com.savchenko.backend.domain.user;

import com.savchenko.backend.domain.base.IdAndDatesEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User extends IdAndDatesEntity {

    @Column(name = "login")
    private String login;

    @Column(name = "password")
    private String password;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user")
    @JoinTable(name = "user_details", joinColumns = @JoinColumn(name = "user_id"))
    private UserDetails userDetails;

}
