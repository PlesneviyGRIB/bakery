package com.savchenko.backend.utils.visitor;

import com.savchenko.backend.dto.product.NewCookieDto;
import com.savchenko.backend.dto.product.NewMarshmallowDto;
import com.savchenko.backend.dto.product.NewPieDto;
import com.savchenko.backend.dto.product.NewProductDto;

public interface NewProductVisitor<R> extends Visitor<NewProductDto, R> {
    R visit(NewCookieDto dto);
    R visit(NewMarshmallowDto dto);
    R visit(NewPieDto dto);
}