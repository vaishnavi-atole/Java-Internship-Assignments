package com.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.product.exception.ResourceNotFoundException;
import com.product.model.Product;
import com.product.repository.ProductRepository;

//Service Implementation class contains business logic and interacts with repository layer.
@Service
public class ProductServiceImpl
        implements ProductService {

    @Autowired
    private ProductRepository repository;

    //Save a new product into database.
    @Override
    public Product addProduct(Product product) {
        return repository.save(product);
    }

    //Retrieve all products from database.
    @Override
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    //Retrieve a product using its ID.
    @Override
    public Product getProductById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id : " + id));
    }

    // Update existing product details.
    @Override
    public Product updateProduct(Long id,
                                 Product product) {

        Product existingProduct = getProductById(id);

        existingProduct.setName(product.getName());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setQuantity(product.getQuantity());

        return repository.save(existingProduct);
    }

    //Delete product using product ID.
    @Override
    public void deleteProduct(Long id) {

        Product existingProduct = getProductById(id);

        repository.delete(existingProduct);
    }
}