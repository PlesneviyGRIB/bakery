package com.savchenko.backend.repository;

import com.savchenko.backend.domain.Product;
import com.savchenko.backend.repository.domain.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends BaseRepository<Product> {
}