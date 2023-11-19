package com.savchenko.backend.service;

import com.savchenko.backend.dao.ProductDao;
import com.savchenko.backend.dao.filterQ.ProductFilterQ;
import com.savchenko.backend.dto.PageRequestDto;
import com.savchenko.backend.dto.PageResponseDto;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import com.savchenko.backend.dto.product.NewProductDto;
import com.savchenko.backend.dto.product.ProductDto;
import com.savchenko.backend.exception.BakeryException;
import com.savchenko.backend.model.Photo;
import com.savchenko.backend.utils.Message;
import com.savchenko.backend.utils.ServiceUtils;
import com.savchenko.backend.utils.Validator;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;

import static com.savchenko.backend.service.supportive.BakeryConverter.pageDataToPageResponse;
import static com.savchenko.backend.service.supportive.BakeryMapper.NewProductDtoToModelMapper;
import static com.savchenko.backend.service.supportive.BakeryMapper.ProductToDtoMapper;

@Service
public class ProductService {

    @Value("${image.product.max.count}")
    private Long productPhotoCountLimit;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private Validator validator;

    @Transactional(readOnly = true)
    public PageResponseDto<ProductDto> products(PageRequestDto<ProductFilterDto> request) {
        var filter = new ProductFilterQ(request.filter);
        var pageData = productDao.products(
                request.pageNumber,
                request.pageSize,
                List.of(filter.buildPredicate()),
                filter.buildOrders());
        return pageDataToPageResponse(pageData, ProductToDtoMapper);
    }

    @Transactional(readOnly = true)
    public ProductDto get(Long id) {
        var product = productDao.getById(id);
        return ProductToDtoMapper.apply(product);
    }

    @Transactional
    public void delete(Long id) {
        if(!productDao.existsById(id)) {
            throw new NoSuchElementException(Message.format("NoSuchElement.product", id));
        }
        productDao.delete(id);
    }

    @Transactional
    public ProductDto createProduct(NewProductDto newProductDto) {
        var p = NewProductDtoToModelMapper.apply(newProductDto);
        p.setInstant(Instant.now());
        var product = productDao.save(p);

        return ProductToDtoMapper.apply(product);
    }

    @Transactional
    public void addPhoto(Long id, String title, String description, Boolean isPreview, MultipartFile file) {
        validator.validateProductImage(file);

        var product = productDao.getById(id);
        var photos = product.getPhotos();

        if(photos.size() >= productPhotoCountLimit) {
            throw new BakeryException("Photos.countLimitExceeded", productPhotoCountLimit);
        }

        try {
            var photo = new Photo(file.getBytes(), title, description, Instant.now(), isPreview);
            product.addPhoto(photo);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
