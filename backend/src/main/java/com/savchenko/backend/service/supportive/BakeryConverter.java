package com.savchenko.backend.service.supportive;

import com.savchenko.backend.dto.product.*;
import com.savchenko.backend.model.Product;
import com.savchenko.backend.model.business.Cookie;
import com.savchenko.backend.model.business.Marshmallow;
import com.savchenko.backend.model.business.Pie;

public class BakeryConverter {
    public static Cookie newCookieDtoToModel(NewCookieDto dto){
        var product = new Cookie();
        newDtoToModelBaseConverter(dto, product);
        return product;
    }

    public static Pie newPieDtoToModel(NewPieDto dto){
        var product = new Pie();
        newDtoToModelBaseConverter(dto, product);
        return product;
    }

    public static Marshmallow newMarshmallowDtoToModel(NewMarshmallowDto dto){
        var product = new Marshmallow();
        newDtoToModelBaseConverter(dto, product);
        return product;
    }

    public static CookieDto cookieModelToDto(Cookie model){
        var dto = new CookieDto();
        modelToDtoBaseConverter(model, dto);
        return dto;
    }

    public static PieDto pieModelToDto(Pie model){
        var dto = new PieDto();
        modelToDtoBaseConverter(model, dto);
        return dto;
    }

    public static MarshmallowDto marshmallowModelToDto(Marshmallow model){
        var dto = new MarshmallowDto();
        modelToDtoBaseConverter(model, dto);
        return dto;
    }

    private static void newDtoToModelBaseConverter(NewProductDto dto, Product model) {
        model.setCount(dto.count);
        model.setDescription(dto.description);
        model.setPrice(dto.price);
        model.setTitle(dto.title);
        model.setProductionTime(dto.productionTime.orElse(null));
    }

    private static void modelToDtoBaseConverter(Product product, ProductDto dto) {
        dto.id = product.getId();
        dto.count = product.getCount();
        dto.description = product.getDescription();
        dto.productionTime = product.getProductionTime();
        dto.instant = product.getInstant();
        dto.price = product.getPrice();
        dto.title = product.getTitle();
    }
}
