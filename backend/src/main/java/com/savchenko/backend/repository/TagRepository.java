package com.savchenko.backend.repository;

import com.savchenko.backend.domain.tag.Tag;
import com.savchenko.backend.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends BaseRepository<Tag> {
}