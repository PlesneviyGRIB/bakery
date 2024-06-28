package com.savchenko.backend.repository;

import com.savchenko.backend.domain.image.Image;
import com.savchenko.backend.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends BaseRepository<Image> {
}
