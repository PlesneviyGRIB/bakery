package com.savchenko.backend.model;

import com.savchenko.backend.model.supportive.BaseEntity;
import jakarta.annotation.Nonnull;

public class UserDetails extends BaseEntity<UserDetails> {
    private String email;
    private String phone;
    private String nickName;
}
