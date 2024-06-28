package com.savchenko.backend.service;

import com.savchenko.backend.converter.ImageConverter;
import com.savchenko.backend.domain.image.Image;
import com.savchenko.backend.dto.image.ImageCreateOrUpdateDto;
import com.savchenko.backend.dto.image.ImageDto;
import com.savchenko.backend.enums.ImageQuality;
import com.savchenko.backend.repository.ImageRepository;
import com.savchenko.backend.service.components.ImageCompressComponent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class ImageService {

    private final ImageRepository imageRepository;

    private final ImageCompressComponent imageCompressComponent;

    private final ImageConverter imageConverter;

    public byte[] get(Long id, ImageQuality imageQuality) {

        var image = imageRepository.getById(id);

        return image.ofQuality(imageQuality);
    }

    public ImageDto create(ImageCreateOrUpdateDto updateDto, MultipartFile file) {

        var image = imageCompressComponent.imageOf(file);

        updateImage(updateDto, image);

        var saved = imageRepository.save(image);

        return imageConverter.convertFull(saved);
    }

    public ImageDto update(Long id, ImageCreateOrUpdateDto updateDto) {

        var image = imageRepository.getById(id);

        updateImage(updateDto, image);

        var saved = imageRepository.save(image);

        return imageConverter.convertFull(saved);
    }

    public void delete(Long id) {
        imageRepository.deleteById(id);
    }

    private void updateImage(ImageCreateOrUpdateDto updateDto, Image image) {
        image.setTitle(updateDto.title);
        image.setDescription(updateDto.description);
    }

}
