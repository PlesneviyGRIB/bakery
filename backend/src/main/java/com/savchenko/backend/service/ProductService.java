package com.savchenko.backend.service;

import com.savchenko.backend.converter.base.ProductConverter;
import com.savchenko.backend.dto.PageRequestDto;
import com.savchenko.backend.dto.PageResponseDto;
import com.savchenko.backend.dto.filter.ProductFilterDto;
import com.savchenko.backend.dto.product.NewProductDto;
import com.savchenko.backend.dto.product.ProductFullDto;
import com.savchenko.backend.dto.product.ProductLightDto;
import com.savchenko.backend.repository.ProductRepository;
import com.savchenko.backend.repository.TagRepository;
import com.savchenko.backend.service.components.ImageComponent;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    @Value("${image.product.max.count}")
    private Long productPhotoCountLimit;

    private final ProductRepository productRepository;

    private final TagRepository tagRepository;

    private final ImageComponent imageComponent;

    private final ProductConverter productConverter;

    @Transactional(readOnly = true)
    public PageResponseDto<ProductLightDto> products(PageRequestDto<ProductFilterDto> request) {
//        var filter = new ProductFilterQ(request.filter);
//        var pageData = productRepository.products(
//                request.pageNumber.intValue(),
//                request.pageSize,
//                List.of(filter.buildPredicate()),
//                filter.buildOrders());
//
//        return new PageResponseDto<>(
//                pageData.data().stream().map(p -> ProductToDtoMapper.apply(p, true)).collect(Collectors.toList()),
//                pageData.pageNumber(), pageData.pageSize(), pageData.totalPages(), pageData.totalCount()
//        );
        return null;
    }

    @Transactional(readOnly = true)
    public ProductFullDto get(Long id) {
        var product = productRepository.getById(id);
        return productConverter.convertFull(product);
    }

    public void delete(Long id) {
//        if (!productRepository.existsById(id)) {
//            throw new NoSuchElementException(Message.format("NoSuchElement.product", id));
//        }
//        productRepository.delete(id);
    }

    public ProductLightDto createProduct(NewProductDto newProductDto) {
//        var p = NewProductDtoToModelMapper.apply(newProductDto);
//        p.setInstant(Instant.now());
//        tagRepository.getAllByIds(newProductDto.tagIds).forEach(p::applyTag);
//        var product = productRepository.save(p);
        //return ProductToDtoMapper.apply(product, false);
        return null;
    }

    public void addPhoto(Long id, String title, String description, Boolean isPreview, MultipartFile file) {
        var product = productRepository.getById(id);
//        var photos = product.getImages();
//
//        if (photos.size() >= productPhotoCountLimit) {
//            throw new BakeryException("Photos.countLimitExceeded", productPhotoCountLimit);
//        }

        var photo = imageComponent.processImage(file, title, description);
//        product.addImage(photo);
    }
}
