package com.savchenko.backend.service;

import com.savchenko.backend.dao.ProductDao;
import com.savchenko.backend.dao.TagDao;
import com.savchenko.backend.dao.filterQ.ProductFilterQ;
import com.savchenko.backend.dto.PageRequestDto;
import com.savchenko.backend.dto.PageResponseDto;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import com.savchenko.backend.dto.product.NewProductDto;
import com.savchenko.backend.dto.product.ProductDto;
import com.savchenko.backend.exception.BakeryException;
import com.savchenko.backend.model.Photo;
import com.savchenko.backend.service.components.ImageComponent;
import com.savchenko.backend.utils.Message;
import com.savchenko.backend.utils.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static com.savchenko.backend.service.supportive.BakeryMapper.NewProductDtoToModelMapper;
import static com.savchenko.backend.service.supportive.BakeryMapper.ProductToDtoMapper;

@Service
public class ProductService {

    @Value("${image.product.max.count}")
    private Long productPhotoCountLimit;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private TagDao tagDao;

    @Autowired
    private ImageComponent imageComponent;

    @Transactional(readOnly = true)
    public PageResponseDto<ProductDto> products(PageRequestDto<ProductFilterDto> request) {
        var filter = new ProductFilterQ(request.filter);
        var pageData = productDao.products(
                request.pageNumber,
                request.pageSize,
                List.of(filter.buildPredicate()),
                filter.buildOrders());

        return new PageResponseDto<>(
                pageData.data().stream().map(p -> ProductToDtoMapper.apply(p, true)).collect(Collectors.toList()),
                pageData.pageNumber(), pageData.pageSize(), pageData.totalPages(), pageData.totalCount()
        );
    }

    @Transactional(readOnly = true)
    public ProductDto get(Long id) {
        var product = productDao.getById(id);
        return ProductToDtoMapper.apply(product, false);
    }

    @Transactional
    public void delete(Long id) {
        if (!productDao.existsById(id)) {
            throw new NoSuchElementException(Message.format("NoSuchElement.product", id));
        }
        productDao.delete(id);
    }

    @Transactional
    public ProductDto createProduct(NewProductDto newProductDto) {
        var p = NewProductDtoToModelMapper.apply(newProductDto);
        p.setInstant(Instant.now());
        tagDao.getAllByIds(newProductDto.tagIds).forEach(p::applyTag);
        var product = productDao.save(p);
        return ProductToDtoMapper.apply(product, false);
    }

    @Transactional
    public void addPhoto(Long id, String title, String description, Boolean isPreview, MultipartFile file) {
        var product = productDao.getById(id);
        var photos = product.getPhotos();

        if (photos.size() >= productPhotoCountLimit) {
            throw new BakeryException("Photos.countLimitExceeded", productPhotoCountLimit);
        }

        var photo = imageComponent.processImage(file, title, description, isPreview);
        product.applyPhoto(photo);
    }
}
