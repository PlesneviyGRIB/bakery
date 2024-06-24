package com.savchenko.backend.configuration;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class ApplicationContextProvider implements ApplicationContextAware {

    private static ApplicationContext INSTANCE;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        INSTANCE = applicationContext;
    }

    public static ApplicationContext getContext() {
        return INSTANCE;
    }

    public static <T> T getBean(Class<T> clazz) {
        return getContext().getBean(clazz);
    }
}

