package com.savchenko.backend.interfaces;

import java.util.Map;

public interface Validatable {
    void validate(Map<String, Object> context);
}
