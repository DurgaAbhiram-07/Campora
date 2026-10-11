package com.campora.api.repository;

import com.campora.api.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByCategory(String category);
    List<Product> findBySellerId(String sellerId);
    List<Product> findByStatus(String status);
    List<Product> findByTitleContainingIgnoreCase(String keyword);
}
