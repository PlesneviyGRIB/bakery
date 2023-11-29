package com.savchenko.backend.interfaces;

import com.savchenko.backend.model.Tag;

public interface Taggable {
    void applyTag(Tag tag);
    void removeTag(Long id);
}
