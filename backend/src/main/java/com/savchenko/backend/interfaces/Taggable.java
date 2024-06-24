package com.savchenko.backend.interfaces;

import com.savchenko.backend.domain.Tag;

public interface Taggable {

    void applyTag(Tag tag);

    void removeTag(Long id);

}
