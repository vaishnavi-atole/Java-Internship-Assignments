package com.order.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CustomerRequestDto {

	@NotBlank(message= "Customer name is required")
	private String name;
	
	@Email(message= "Invalid email format")
	private String email;
	
}
