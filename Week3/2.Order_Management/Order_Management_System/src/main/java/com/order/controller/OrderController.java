package com.order.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.order.dto.OrderRequestDto;
import com.order.entity.OrderEntity;
import com.order.service.OrderService;

import jakarta.validation.Valid;
/*
 * Used to create REST APIs and return JSON responses
    */
@RestController
    // Base URL for all APIs in this controller
@RequestMapping("/orders")
public class OrderController {
  // Service layer object to handle business logic
    private final OrderService service;

    public OrderController(
            OrderService service) {

        this.service = service;
    }
    //Create a new order for a customer
    @PostMapping("/{customerId}")
    public OrderEntity createOrder(
            @PathVariable Long customerId,
            @Valid @RequestBody OrderRequestDto dto) {

        return service.createOrder(
                customerId,
                dto);
    }
    //Get all orders with Pagination and Sorting
    @GetMapping
    public Page<OrderEntity> getAllOrders(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size,

            @RequestParam(defaultValue = "id")
            String sortBy) {

        return service.getAllOrders(
                page,
                size,
                sortBy);
    }
    // Get a single order by its ID
    @GetMapping("/{id}")
    public OrderEntity getOrderById(
            @PathVariable Long id) {

        return service.getOrderById(id);
    }
    // Update an existing order
    @PutMapping("/{id}")
    public OrderEntity updateOrder(
            @PathVariable Long id,
            @Valid @RequestBody OrderRequestDto dto) {

        return service.updateOrder(id, dto);
    }
    // Delete an order using its ID
    @DeleteMapping("/{id}")
    public String deleteOrder(
            @PathVariable Long id) {

        service.deleteOrder(id);

        return "Order Deleted Successfully";
    }
}
