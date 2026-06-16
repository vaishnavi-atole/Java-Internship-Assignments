package com.order.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.order.dto.OrderRequestDto;
import com.order.entity.Customer;
import com.order.entity.OrderEntity;
import com.order.exception.ResourceNotFoundException;
import com.order.repository.CustomerRepository;
import com.order.repository.OrderRepository;

@Service
public class OrderService {

	private final OrderRepository orderRepository;
	private final CustomerRepository customerRepository;

	public OrderService(OrderRepository orderRepository, CustomerRepository customerRepository) {

		this.orderRepository = orderRepository;
		this.customerRepository = customerRepository;
	}

	// Create Order for Customer

	public OrderEntity createOrder(Long customerId, OrderRequestDto dto) {

		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

		OrderEntity order = new OrderEntity();

		order.setProductName(dto.getProductName());
		order.setQuantity(dto.getQuantity());
		order.setPrice(dto.getPrice());

		order.setCustomer(customer);

		return orderRepository.save(order);
	}

	// get all orders with Pagination + Sorting

	public Page<OrderEntity> getAllOrders(int page, int size, String sortBy) {

		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

		return orderRepository.findAll(pageable);
	}

	// Get Order By Id 
	public OrderEntity getOrderById(Long id) {
		return orderRepository.
				findById(id).
				orElseThrow(() -> 
				new ResourceNotFoundException("Order not found"));
	}
	
	//Update Existing Order  
	public OrderEntity updateOrder(Long id, OrderRequestDto dto) {
		OrderEntity order = orderRepository.findById(id) 
				.orElseThrow(() -> 
				new ResourceNotFoundException("Order not found")); 
		order.setProductName(dto.getProductName()); 
		order.setQuantity(dto.getQuantity());
		order.setPrice(dto.getPrice());
		return orderRepository.save(order);
		}
	
	//Delete Order by ID 
	public void deleteOrder(Long id) { 
		OrderEntity order = orderRepository.findById(id) 
				.orElseThrow(() -> 
				new ResourceNotFoundException("Order not found")); 
		orderRepository.delete(order); 
		}
}
