package com.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.product.model.Product;
import com.product.service.ProductService;
 
//
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService service;

  
     //Add Product
     
    @PostMapping
    public Product addProduct(
            @RequestBody Product product) {

        return service.addProduct(product);
    }

   
     // Get All Products
     
    @GetMapping
    public List<Product> getAllProducts() {

        return service.getAllProducts();
    }

   
    //Get Product By Id
    
    @GetMapping("/{id}")
    public Product getProductById(
            @PathVariable Long id) {

        return service.getProductById(id);
    }

    
     // Update Product
     
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return service.updateProduct(id, product);
    }

   
     // Delete Product
   
    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        service.deleteProduct(id);

        return "Product Deleted Successfully";
    }
}