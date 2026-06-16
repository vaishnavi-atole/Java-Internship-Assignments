package com.order.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "customers")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "orders")
public class Customer {

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Customer Name Validation
    @NotBlank(message = "Customer name is required")
    private String name;

    // Email Validation
    @Email(message = "Invalid email format")
    private String email;

    // One Customer can have Multiple Orders
    @JsonManagedReference
    @OneToMany(mappedBy = "customer",
               cascade = CascadeType.ALL)
    private List<OrderEntity> orders;
}