package com.order.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.order.dto.CustomerRequestDto;
import com.order.entity.Customer;
import com.order.exception.ResourceNotFoundException;
import com.order.repository.CustomerRepository;


@Service
	public class CustomerService {

	    private final CustomerRepository customerRepository;

	    public CustomerService(
	            CustomerRepository customerRepository) {

	        this.customerRepository = customerRepository;
	    }

	    
	     // Save New Customer
	     
	    public Customer createCustomer(
	            CustomerRequestDto dto) {

	        Customer customer = new Customer();

	        customer.setName(dto.getName());
	        customer.setEmail(dto.getEmail());

	        return customerRepository.save(customer);
	    }
	    
	    //find customer by id
	    public Customer getCustomerById(Long id) {

	        return customerRepository.findById(id)
	                .orElseThrow(() ->
	                        new ResourceNotFoundException(
	                                "Customer not found"));
	    }
	    
	  //return all customers
	    public List<Customer> getAllCustomers() {

	        return customerRepository.findAll();
	    }
	    
	//Update Customer by ID
	    public Customer updateCustomer(Long id,
	                                   CustomerRequestDto dto) {

	        Customer customer =
	                customerRepository.findById(id)
	                .orElseThrow(() ->
	                        new ResourceNotFoundException(
	                                "Customer not found"));

	        customer.setName(dto.getName());
	        customer.setEmail(dto.getEmail());

	        return customerRepository.save(customer);
	    }
	    
	    //Delete Customer by ID
	    public void deleteCustomer(Long id) {

	        Customer customer =
	                customerRepository.findById(id)
	                .orElseThrow(() ->
	                        new ResourceNotFoundException(
	                                "Customer not found"));

	        customerRepository.delete(customer);
	    }
	    
	}


