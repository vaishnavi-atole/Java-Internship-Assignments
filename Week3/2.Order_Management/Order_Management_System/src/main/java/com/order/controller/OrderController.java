package com.order.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.order.dto.OrderRequestDto;
import com.order.entity.OrderEntity;
import com.order.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(
            OrderService service) {

        this.service = service;
    }

    @PostMapping("/{customerId}")
    public OrderEntity createOrder(
            @PathVariable Long customerId,
            @Valid @RequestBody OrderRequestDto dto) {

        return service.createOrder(
                customerId,
                dto);
    }

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
    @GetMapping("/{id}")
    public OrderEntity getOrderById(
            @PathVariable Long id) {

        return service.getOrderById(id);
    }

    @PutMapping("/{id}")
    public OrderEntity updateOrder(
            @PathVariable Long id,
            @Valid @RequestBody OrderRequestDto dto) {

        return service.updateOrder(id, dto);
    }
    
    @DeleteMapping("/{id}")
    public String deleteOrder(
            @PathVariable Long id) {

        service.deleteOrder(id);

        return "Order Deleted Successfully";
    }
}
