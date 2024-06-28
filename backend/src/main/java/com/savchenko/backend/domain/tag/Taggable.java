package com.savchenko.backend.domain.tag;

public interface Taggable {

    void addTag(Tag tag);

    void removeTag(Long id);

}
