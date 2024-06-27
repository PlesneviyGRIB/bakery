package com.savchenko.backend.domain.tag;

import com.savchenko.backend.domain.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "tag")
@Getter
public class Tag extends BaseEntity {

    @Column(name = "title")
    private String title;

}
