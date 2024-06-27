package com.savchenko.backend.repository;

import com.savchenko.backend.domain.product.Product;
import com.savchenko.backend.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends BaseRepository<Product> {
}