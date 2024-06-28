package com.savchenko.backend.domain.image;

import com.savchenko.backend.domain.base.IdAndDatesAndOwnerEntity;
import com.savchenko.backend.enums.ImageQuality;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "image")
@Getter
@Setter
public class Image extends IdAndDatesAndOwnerEntity {

    @Column(name = "src")
    private byte[] src;

    @Column(name = "high_quality")
    private byte[] highQuality;

    @Column(name = "medium_quality")
    private byte[] mediumQuality;

    @Column(name = "min_quality")
    private byte[] minQuality;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    public byte[] ofQuality(ImageQuality quality) {
        return switch (quality) {
            case MAX -> src;
            case HIGH -> highQuality;
            case MEDIUM -> mediumQuality;
            case MIN -> minQuality;
        };
    }

}
