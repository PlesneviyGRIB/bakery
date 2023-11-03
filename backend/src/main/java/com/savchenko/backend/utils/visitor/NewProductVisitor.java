package com.savchenko.backend.utils.visitor;

import com.savchenko.backend.dto.product.NewCookieDto;
import com.savchenko.backend.dto.product.NewMarshmallowDto;
import com.savchenko.backend.dto.product.NewPieDto;

public interface NewProductVisitor<R> {
    R visit(NewCookieDto dto);
    R visit(NewMarshmallowDto dto);
    R visit(NewPieDto dto);
}