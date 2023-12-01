package com.savchenko.backend.aspect;

import com.savchenko.backend.dto.product.NewProductDto;
import com.savchenko.backend.interfaces.Validatable;
import com.savchenko.backend.utils.annotation.Validate;
import jakarta.annotation.PostConstruct;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@Aspect
public class ValidationAspect {
    @Value("${tags.max.count}")
    private Integer maxTagsCount;
    private Map<String, Object> context = new HashMap<>();

    @PostConstruct
    private void setContext() {
        context.put("tags.max.count", maxTagsCount);
    }

    @Before("Pointcuts.restControllers() && Pointcuts.publicMethods()")
    public void validateParameters(JoinPoint joinPoint){
        var validatableOpt = AspectUtils.<Validatable>annotatedParameterValue(joinPoint, Validate.class);
        validatableOpt.ifPresent(validatable -> validatable.validate(context));
    }

}
