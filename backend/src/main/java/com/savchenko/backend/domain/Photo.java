package com.savchenko.backend.domain;

import com.savchenko.backend.domain.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "photo")
@Getter
@Setter
public class Photo extends BaseEntity {

    @Column(name = "src")
    private byte[] src;

    @Column(name = "compressed")
    private byte[] compressed;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

}
