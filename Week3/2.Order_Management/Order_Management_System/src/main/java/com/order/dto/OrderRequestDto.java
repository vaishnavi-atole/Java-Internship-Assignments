package com.order.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OrderRequestDto {
	
	@NotBlank(message ="Product Name is required")
	private String productName;
	
	   @Min(value = 1,
		         message = "Quantity must be greater than zero")
		    private Integer quantity;

		    private Double price;
	

}
