package com.savchenko.backend.utils;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class ServiceUtils {
    public static String toBase64(MultipartFile file){
        try {
            return "PREFIX" + Base64.encodeBase64String(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
