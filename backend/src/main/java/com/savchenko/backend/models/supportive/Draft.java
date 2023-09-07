package com.savchenko.backend.models.supportive;

public abstract class Draft<T> extends BaseEntity<T> {
    protected boolean draft;

    public abstract void checkDraft();
}
