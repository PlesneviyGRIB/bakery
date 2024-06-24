package com.savchenko.backend.interfaces;

import com.savchenko.backend.domain.Photo;

public interface Imageable {
    void applyPhoto(Photo photo);
    void removePhoto(Long id);
}
