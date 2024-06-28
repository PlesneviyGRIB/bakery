package com.savchenko.backend.service.components;

import com.savchenko.backend.domain.image.Image;
import com.savchenko.backend.exception.BakeryException;
import com.savchenko.backend.utils.ServiceUtils;
import com.savchenko.backend.utils.Validator;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Component
public class ImageComponent {

    @Value("${image.compress.quality}")
    private Long compressQuality;

    @Autowired
    private Validator validator;

    public Image processImage(MultipartFile file, String title, String description) {
        validator.validateImage(file);
        try {
            var stream = new ByteArrayOutputStream();
            var factor = ServiceUtils.calculateCompressFactor(file, compressQuality * 1024);

            Thumbnails.of(new ByteArrayInputStream(file.getBytes()))
                    .scale(factor.getFirst())
                    .outputQuality(factor.getSecond())
                    .toOutputStream(stream);

            var photo = new Image();
            photo.setSrc(file.getBytes());
            photo.setMediumQuality(stream.toByteArray());
            photo.setTitle(title);
            photo.setDescription(description);

            return photo;
        } catch (IOException e) {
            e.printStackTrace();
            throw new BakeryException("image.processingError");
        }
    }
}
