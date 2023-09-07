package com.savchenko.backend.models;

import com.savchenko.backend.models.supportive.BaseEntity;

public class UserDetails extends BaseEntity<UserDetails> {
    private String email;
    private String phone;
    private String nickName;

    @Override
    public int compareTo(UserDetails userDetails) {
        return 0;
    }
}
