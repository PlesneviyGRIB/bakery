package com.savchenko.backend.utils;

import com.savchenko.backend.exception.BakeryException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@Component
public class Validator {
    @Value("${image.product.max.size}")
    private Long productImageSizeLimit;

    public void validateProductImage(MultipartFile file) {
        isImage(file);

        if(file.getSize() > productImageSizeLimit){
            throw new BakeryException("Photos.sizeLimitExceeded", file.getName(), productImageSizeLimit, file.getSize());
        }
    }

    private void isImage(MultipartFile file){
        if(file.isEmpty() || !Objects.requireNonNull(file.getContentType()).contains("image")){
            throw new BakeryException("File.wrongFileType", file.getName());
        }
    }
}
