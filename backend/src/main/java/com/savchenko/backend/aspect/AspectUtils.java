package com.savchenko.backend.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.aop.support.AopUtils;

import java.lang.annotation.Annotation;
import java.lang.reflect.Parameter;
import java.util.Optional;
import java.util.stream.Stream;

public class AspectUtils {

    public static Parameter[] getParameters(JoinPoint joinPoint) {
        return AopUtils.getMostSpecificMethod(((MethodSignature) joinPoint.getSignature()).getMethod(), joinPoint.getTarget().getClass()).getParameters();
    }

    public static <V> Optional<V> annotatedParameterValue(JoinPoint joinPoint, Class<? extends Annotation> annotation) {
        var parameters = getParameters(joinPoint);
        var indexOpt = Stream
                .iterate(0, prev -> prev + 1)
                .limit(parameters.length)
                .filter(i -> parameters[i].getAnnotation(annotation) != null)
                .findFirst();
        return indexOpt.map(index -> (V) joinPoint.getArgs()[index]);
    }

}