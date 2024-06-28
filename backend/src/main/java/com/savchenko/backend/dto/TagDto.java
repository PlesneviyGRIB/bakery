package com.savchenko.backend.dto;

import com.savchenko.backend.dto.base.IdAndDatesDto;
import com.savchenko.backend.enums.TagCategory;

public class TagDto extends IdAndDatesDto {

    public TagCategory category;

    public String title;

}
