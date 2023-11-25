package com.savchenko.backend.model;

import com.savchenko.backend.model.supportive.BaseEntity;
import jakarta.persistence.Entity;

import java.time.Instant;

@Entity
public class Photo extends BaseEntity<Photo> {
    private byte[] src;
    private byte[] compressed;
    private String title;
    private String description;
    private Instant instant;
    private boolean isPreview;

    public Photo(byte[] src, byte[] compressed, String title, String description, Instant instant, Boolean isPreview) {
        this.src = src;
        this.compressed = compressed;
        this.title = title;
        this.description = description;
        this.instant = instant;
        this.isPreview = isPreview;
    }

    public Photo() {

    }

    public byte[] getSrc() {
        return src;
    }

    public byte[] getCompressed() {
        return compressed;
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
