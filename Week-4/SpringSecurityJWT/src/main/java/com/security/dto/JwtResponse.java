package com.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO returned after successful login.
 * Contains generated JWT token.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {

    private String token;
}
