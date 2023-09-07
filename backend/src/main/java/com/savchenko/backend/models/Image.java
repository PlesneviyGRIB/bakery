package com.savchenko.backend.models;

import com.savchenko.backend.models.supportive.Draft;

public class Image extends Draft<Image> {
    private String src;
    private String title;

    @Override
    public int compareTo(Image image) {
        return 0;
    }

    @Override
    public void checkDraft() {
        this.draft = false;
    }
}
