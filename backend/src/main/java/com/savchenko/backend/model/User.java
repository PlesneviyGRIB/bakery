package com.savchenko.backend.model;

import com.savchenko.backend.model.supportive.BaseEntity;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
public class User extends BaseEntity<User> {

    private String login;
    private String password;
    private Instant createdAt;
    private Instant lastVisitedAt;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user")
    @JoinTable(name = "user_details", joinColumns = @JoinColumn(name = "user_id"))
    private UserDetails userDetails;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getLastVisitedAt() {
        return lastVisitedAt;
    }

    public void setLastVisitedAt(Instant lastVisitedAt) {
        this.lastVisitedAt = lastVisitedAt;
    }

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }
}
