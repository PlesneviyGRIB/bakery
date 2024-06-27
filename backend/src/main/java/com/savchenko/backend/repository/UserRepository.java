package com.savchenko.backend.repository;

import com.savchenko.backend.domain.User;
import com.savchenko.backend.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<User> {
}
