package com.savchenko.backend.utils;

import org.apache.tomcat.util.codec.binary.Base64;
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
}
