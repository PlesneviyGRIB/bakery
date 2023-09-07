package com.savchenko.backend.models;

import com.savchenko.backend.models.supportive.BaseEntity;

public class User extends BaseEntity<User> {
    private String login;
    private String password;
    private UserDetails userDetails;

    @Override
    public int compareTo(User user) {
        return 0;
    }
}
