package com.security.controller;

import org.springframework.web.bind.annotation.*;

import com.security.dto.JwtResponse;
import com.security.dto.LoginRequest;
import com.security.dto.RegisterRequest;
import com.security.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService) {

        this.authService = authService;
    }

    /**
     * Register User
     */
    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    /**
     * Login User
     */
    @PostMapping("/login")
    public JwtResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}