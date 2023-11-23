package com.savchenko.backend.aspect;

import org.aspectj.lang.annotation.Pointcut;

public class Pointcuts {
    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
    public void restControllers() {}

    @Pointcut("execution(public * *(..))")
    public void publicMethods() {}
}
