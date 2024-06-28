package com.savchenko.backend.service.components;

import com.savchenko.backend.domain.image.Image;
import com.savchenko.backend.utils.ServiceUtils;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Component
public class ImageCompressComponent {

    @Value("${image.compress.quality.high}")
    private Long compressHighQualitySizeKb;

    @Value("${image.compress.quality.medium}")
    private Long compressMediumQualitySizeKb;

    @Value("${image.compress.quality.min}")
    private Long compressMinQualitySizeKb;

    public Image imageOf(MultipartFile file) {
        try {
            var image = new Image();

            image.setSrc(file.getBytes());
            image.setHighQuality(compress(file, compressHighQualitySizeKb));
            image.setMediumQuality(compress(file, compressMediumQualitySizeKb));
            image.setMinQuality(compress(file, compressMinQualitySizeKb));

            return image;
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    private byte[] compress(MultipartFile file, Long qualityInKb) throws IOException {
        var stream = new ByteArrayOutputStream();
        var factor = ServiceUtils.calculateCompressFactor(file, qualityInKb * 1024);

        Thumbnails.of(new ByteArrayInputStream(file.getBytes()))
                .scale(factor.getFirst())
                .outputQuality(factor.getSecond())
                .toOutputStream(stream);

        return stream.toByteArray();
    }
}
