package com.savchenko.backend.repository;

import com.savchenko.backend.domain.Tag;
import com.savchenko.backend.repository.domain.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends BaseRepository<Tag> {
}