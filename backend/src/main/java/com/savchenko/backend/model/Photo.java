package com.savchenko.backend.model;

import com.savchenko.backend.model.supportive.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import java.time.Instant;

@Entity
public class Photo extends BaseEntity<Photo> {
    private Long entityId;
    private String src;
    private String title;
    private String description;
    private Instant instant;
    private Boolean primary;

    public Photo(String src, String title, String description, Instant instant, Boolean primary) {
        this.src = src;
        this.title = title;
        this.description = description;
        this.instant = instant;
        this.primary = primary;
    }

    public void setEntityId(Long id){
        entityId = id;
    }
}
