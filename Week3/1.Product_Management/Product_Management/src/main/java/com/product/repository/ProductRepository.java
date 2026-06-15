package com.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.product.model.Product;

// Repository Layer Handles database operations using Spring Data JPA.
//JpaRepository provides built-in CRUD methods.
public interface ProductRepository
extends JpaRepository<Product, Long> {

}