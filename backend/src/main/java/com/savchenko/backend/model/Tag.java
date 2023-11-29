package com.savchenko.backend.model;

import com.savchenko.backend.model.supportive.BaseEntity;
import jakarta.persistence.Entity;

@Entity
public class Tag extends BaseEntity<Tag> {
    private String title;

    public Tag(String title) {
        this.title = title;
    }

    public Tag() {
    }

    public String getTitle() {
        return title;
    }

    @Override
    public int compareTo(Tag tag) {
        return this.title.compareTo(tag.title);
    }
}
