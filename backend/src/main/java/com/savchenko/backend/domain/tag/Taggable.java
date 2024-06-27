package com.savchenko.backend.domain.tag;

public interface Taggable {

    void applyTag(Tag tag);

    void removeTag(Long id);

}
