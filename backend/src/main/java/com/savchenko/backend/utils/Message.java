package com.savchenko.backend.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class Message {
    private static final Properties properties;

    static {
        properties = new Properties();
        var resourcePath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
        try {
            properties.load(new FileInputStream(resourcePath + "message.properties"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String format(String key, Object... args){
        return String.format(properties.getProperty(key, key), args);
    }
}
