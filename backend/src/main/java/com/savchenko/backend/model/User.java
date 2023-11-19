package com.savchenko.backend.model;

import com.savchenko.backend.model.supportive.BaseEntity;
import jakarta.annotation.Nonnull;

public class User extends BaseEntity<User> {
    private String login;
    private String password;
    private UserDetails userDetails;
}
