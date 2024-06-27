package com.savchenko.backend.converter.utils;

import com.savchenko.backend.dto.base.PageResponseDto;
import org.springframework.data.domain.Page;

import java.util.function.Function;

public class ConverterUtils {

    public static <Dto, Entity> PageResponseDto<Dto> convertPage(Page<Entity> page, Function<Entity, Dto> converter) {
        return new PageResponseDto<>(page.map(converter).stream().toList(), page.getNumber(), page.getSize(), page.getTotalPages());
    }

}
