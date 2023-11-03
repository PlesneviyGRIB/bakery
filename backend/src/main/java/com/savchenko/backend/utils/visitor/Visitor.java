package com.savchenko.backend.utils.visitor;

public interface Visitor<D, V> {
    V visit(D data);
}
