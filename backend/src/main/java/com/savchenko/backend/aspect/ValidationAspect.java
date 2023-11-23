package com.savchenko.backend.aspect;

import com.savchenko.backend.interfaces.Validatable;
import com.savchenko.backend.utils.annotation.Validate;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class ValidationAspect {

    @Before("Pointcuts.restControllers() && Pointcuts.publicMethods()")
    public void validateParameters(JoinPoint joinPoint){
        var validatableOpt = AspectUtils.<Validatable>annotatedParameterValue(joinPoint, Validate.class);
        validatableOpt.ifPresent(Validatable::validate);
    }

}
