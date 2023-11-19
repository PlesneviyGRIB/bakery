package com.savchenko.backend.service.supportive;

import com.savchenko.backend.dao.base.PageData;
import com.savchenko.backend.dto.PageResponseDto;
import com.savchenko.backend.dto.PhotoDto;
import com.savchenko.backend.dto.product.*;
import com.savchenko.backend.model.Photo;
import com.savchenko.backend.model.Product;
import com.savchenko.backend.model.business.Cookie;
import com.savchenko.backend.model.business.Marshmallow;
import com.savchenko.backend.model.business.Pie;
import com.savchenko.backend.utils.ServiceUtils;

import java.util.function.Function;
import java.util.stream.Collectors;

public class BakeryConverter {
    public static Cookie newCookieDtoToModel(NewCookieDto dto) {
        var product = new Cookie();
        newDtoToModelBaseConverter(dto, product);
        return product;
    }

    public static Pie newPieDtoToModel(NewPieDto dto) {
        var product = new Pie();
        newDtoToModelBaseConverter(dto, product);
        return product;
    }

    public static Marshmallow newMarshmallowDtoToModel(NewMarshmallowDto dto) {
        var product = new Marshmallow();
        newDtoToModelBaseConverter(dto, product);
        return product;
    }

    public static CookieDto cookieModelToDto(Cookie model) {
        var dto = new CookieDto();
        modelToDtoBaseConverter(model, dto);
        return dto;
    }

    public static PieDto pieModelToDto(Pie model) {
        var dto = new PieDto();
        modelToDtoBaseConverter(model, dto);
        return dto;
    }

    public static PhotoDto photoModelToDto(Photo model) {
        var dto = new PhotoDto();
        dto.src = ServiceUtils.imageToBase64(model.getSrc());
        dto.title = model.getTitle();
        dto.description = model.getDescription();
        dto.instant = model.getInstant();
        dto.isPreview = model.isPreview();
        return dto;
    }

    public static MarshmallowDto marshmallowModelToDto(Marshmallow model) {
        var dto = new MarshmallowDto();
        modelToDtoBaseConverter(model, dto);
        return dto;
    }

    public static <M, D> PageResponseDto<D> pageDataToPageResponse(PageData<M> data, Function<M, D> mapper) {
        return new PageResponseDto<>(
                data.data().stream().map(mapper).collect(Collectors.toList()),
                data.pageNumber(), data.pageSize(), data.totalPages(), data.totalCount());
    }

    private static void newDtoToModelBaseConverter(NewProductDto dto, Product model) {
        model.setCount(dto.count);
        model.setDescription(dto.description);
        model.setPrice(dto.price);
        model.setTitle(dto.title);
        model.setProductionTime(dto.getProductionTime().orElse(null));
        model.setWeight(dto.getWeight().orElse(null));
    }

    private static void modelToDtoBaseConverter(Product product, ProductDto dto) {
        dto.id = product.getId();
        dto.count = product.getCount();
        dto.description = product.getDescription();
        dto.productionTime = product.getProductionTime();
        dto.weight = product.getWeight();
        dto.instant = product.getInstant();
        dto.price = product.getPrice();
        dto.title = product.getTitle();
        dto.photos = product.getPhotos().stream().map(BakeryConverter::photoModelToDto).toList();
    }
}
