package com.savchenko.backend.domain.tag;

import com.savchenko.backend.domain.base.IdAndDatesEntity;
import com.savchenko.backend.enums.TagCategory;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "tag")
@Getter
public class Tag extends IdAndDatesEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private TagCategory category;

    @Column(name = "title")
    private String title;

}
