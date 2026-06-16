package com.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.order.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
