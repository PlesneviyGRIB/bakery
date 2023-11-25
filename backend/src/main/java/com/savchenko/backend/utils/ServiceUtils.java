package com.savchenko.backend.utils;

import com.mysema.commons.lang.Pair;
import org.apache.tomcat.util.codec.binary.Base64;
import org.hibernate.mapping.Map;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class ServiceUtils {
    public static String imageToBase64(MultipartFile file){
        try {
            return imageToBase64(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String imageToBase64(byte[] src){
        return "data:image;base64, " + Base64.encodeBase64String(src);
    }

    public static Pair<Double, Double> calculateCompressFactor(MultipartFile file, Long maxSize) {
        var size = file.getSize();
        if(size <= maxSize) {
            return Pair.of(1.0,1.0);
        }
        var factor = Double.valueOf(maxSize) / size;
        return  Pair.of(Math.sqrt(factor), Math.sqrt(factor));
    }
}
