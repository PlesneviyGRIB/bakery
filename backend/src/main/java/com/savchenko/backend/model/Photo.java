package com.savchenko.backend.model;

import com.savchenko.backend.model.supportive.BaseEntity;
import jakarta.persistence.Entity;

import java.time.Instant;

@Entity
public class Photo extends BaseEntity<Photo> {
    private Long entityId;
    private byte[] src;
    private String title;
    private String description;
    private Instant instant;
    private boolean isPreview;

    public Photo(byte[] src, String title, String description, Instant instant, Boolean isPreview) {
        this.src = src;
        this.title = title;
        this.description = description;
        this.instant = instant;
        this.isPreview = isPreview;
    }

    public Photo() {

    }

    public void setEntityId(Long id){
        entityId = id;
    }

    public byte[] getSrc() {
        return src;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Instant getInstant() {
        return instant;
    }

    public Boolean isPreview() {
        return isPreview;
    }
}
