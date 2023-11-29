package com.savchenko.backend.service.supportive;

import com.savchenko.backend.dto.PhotoDto;
import com.savchenko.backend.dto.product.*;
import com.savchenko.backend.model.Photo;
import com.savchenko.backend.model.Product;
import com.savchenko.backend.model.business.Cookie;
import com.savchenko.backend.model.business.Marshmallow;
import com.savchenko.backend.model.business.Pie;
import com.savchenko.backend.utils.ServiceUtils;

public class ProductConverter {
    private Boolean light;
    public ProductConverter(Boolean light) {
        this.light = light;
    }

    public ProductConverter() {
        this.light = false;
    }

    public Cookie newCookieDtoToModel(NewCookieDto dto) {
        var product = new Cookie();
        newDtoToModelBaseConverter(dto, product);
        return product;
    }

    public Pie newPieDtoToModel(NewPieDto dto) {
        var product = new Pie();
        newDtoToModelBaseConverter(dto, product);
        return product;
    }

    public Marshmallow newMarshmallowDtoToModel(NewMarshmallowDto dto) {
        var product = new Marshmallow();
        newDtoToModelBaseConverter(dto, product);
        return product;
    }

    public CookieDto cookieModelToDto(Cookie model) {
        var dto = new CookieDto();
        modelToDtoBaseConverter(model, dto);
        return dto;
    }

    public PieDto pieModelToDto(Pie model) {
        var dto = new PieDto();
        modelToDtoBaseConverter(model, dto);
        return dto;
    }

    public PhotoDto photoModelToDto(Photo model) {
        var dto = new PhotoDto();
        if(light){
            dto.src = ServiceUtils.imageToBase64(model.getCompressed());
        } else {
            dto.src = ServiceUtils.imageToBase64(model.getSrc());
        }
        dto.title = model.getTitle();
        dto.description = model.getDescription();
        dto.instant = model.getInstant();
        dto.isPreview = model.isPreview();
        return dto;
    }

    public MarshmallowDto marshmallowModelToDto(Marshmallow model) {
        var dto = new MarshmallowDto();
        modelToDtoBaseConverter(model, dto);
        return dto;
    }

    private void newDtoToModelBaseConverter(NewProductDto dto, Product model) {
        model.setCount(dto.count);
        model.setDescription(dto.description);
        model.setPrice(dto.price);
        model.setTitle(dto.title);
        model.setProductionTime(dto.productionTime);
        model.setWeight(dto.weight);
    }

    private void modelToDtoBaseConverter(Product product, ProductDto dto) {
        dto.id = product.getId();
        dto.count = product.getCount();
        dto.description = product.getDescription();
        dto.productionTime = product.getProductionTime();
        dto.weight = product.getWeight();
        dto.instant = product.getInstant();
        dto.price = product.getPrice();
        dto.title = product.getTitle();
        dto.tags = product.getTags().stream().map(tag -> BakeryConverter.tagModelToDto(tag, null)).toList();

        if(light){
            dto.photos = product.getPhotos().stream()
                    //.filter(Photo::isPreview)
                    .map(this::photoModelToDto)
                    .limit(1)
                    .toList();
        } else {
            dto.photos = product.getPhotos().stream()
                    .map(this::photoModelToDto)
                    .toList();
        }
    }
}
