package com.savchenko.backend.utils.visitor;

import com.savchenko.backend.model.business.Cookie;
import com.savchenko.backend.model.business.Marshmallow;
import com.savchenko.backend.model.business.Pie;

public interface ProductVisitor<R> {
    R visit(Cookie dto);
    R visit(Pie dto);
    R visit(Marshmallow dto);
}
