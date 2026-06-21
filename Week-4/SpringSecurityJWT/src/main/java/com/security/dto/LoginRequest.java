package com.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO used for login requests.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
	 private String username;
	    private String password;

}
