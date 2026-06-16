package com.order.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "orders")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Product Name Validation
    @NotBlank(message = "Product name is required")
    private String productName;

    // Quantity Validation
    @Min(value = 1,
         message = "Quantity must be greater than 0")
    private int quantity;

    private double price;

    // Many Orders belong to One Customer
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
