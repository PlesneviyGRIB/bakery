package com.savchenko.backend.domain.image;

import com.savchenko.backend.domain.base.IdAndDatesEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "image")
@Getter
@Setter
public class Image extends IdAndDatesEntity {

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

}
