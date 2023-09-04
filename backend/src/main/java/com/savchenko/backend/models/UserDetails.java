package com.savchenko.backend.models;

public class UserDetails extends  BaseEntity<UserDetails> {
    private String email;
    private String phone;
    private String nickName;

    @Override
    public int compareTo(UserDetails userDetails) {
        return 0;
    }
}
