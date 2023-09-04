package com.savchenko.backend.models;

public class User extends BaseEntity<User> {
    private String login;
    private String password;
    private UserDetails userDetails;

    @Override
    public int compareTo(User user) {
        return 0;
    }
}
