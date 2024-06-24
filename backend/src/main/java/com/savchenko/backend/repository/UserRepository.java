package com.savchenko.backend.repository;

import com.savchenko.backend.domain.User;
import com.savchenko.backend.repository.domain.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<User> {
}
