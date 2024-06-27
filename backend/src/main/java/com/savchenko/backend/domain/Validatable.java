package com.savchenko.backend.domain;

import java.util.Map;

public interface Validatable {
    void validate(Map<String, Object> context);
}
