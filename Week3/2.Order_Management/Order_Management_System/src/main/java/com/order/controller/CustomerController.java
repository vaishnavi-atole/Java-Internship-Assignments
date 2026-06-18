package com.order.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.order.dto.CustomerRequestDto;
import com.order.entity.Customer;
import com.order.service.CustomerService;

import jakarta.validation.Valid;
/*
 * Used to create REST APIs.
 * Returns data in JSON format.
 */
@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(
            CustomerService service) {

        this.service = service;
    }
   /*
    *Create a new order for specifies customer
    */
    @PostMapping
    public Customer createCustomer(
            @Valid @RequestBody CustomerRequestDto dto) {

        return service.createCustomer(dto);
    }
    //Get all customers
    @GetMapping
    public List<Customer> getAllCustomers() {

        return service.getAllCustomers();
    }
    //Get a customer by ID
    @GetMapping("/{id}")
    public Customer getCustomerById(
            @PathVariable Long id) {

        return service.getCustomerById(id);
    }

    //Update an existing customer
    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequestDto dto) {

        return service.updateCustomer(id,
                                              dto);
    }

    //delete a customer by ID
    @DeleteMapping("/{id}")
    public String deleteCustomer(
            @PathVariable Long id) {

        service.deleteCustomer(id);

        return "Customer Deleted Successfully";
    }
}
