package com.security.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.security.dto.JwtResponse;
import com.security.dto.LoginRequest;
import com.security.dto.RegisterRequest;
import com.security.entity.User;
import com.security.exception.CustomException;
import com.security.repository.UserRepository;
import com.security.securityjwt.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            AuthenticationManager authenticationManager) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Register new user.
     */
    public String register(RegisterRequest request) {

        // Check username already exists
        if (userRepository.existsByUsername(
                request.getUsername())) {

        	throw new CustomException("Username already exists");
        }

        User user = new User();

        user.setUsername(request.getUsername());

        // Encrypt password before saving
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setRole(request.getRole());

        userRepository.save(user);

        return "User Registered Successfully";
    }

    /**
     * Login user and generate JWT token.
     */
    public JwtResponse login(LoginRequest request) {

        // Authenticate username and password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        // Generate token
        String token =
                jwtUtil.generateToken(
                        request.getUsername());

        return new JwtResponse(token);
    }
}
