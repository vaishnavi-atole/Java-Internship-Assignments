package com.hospital.service;

import com.hospital.dto.AuthResponse;
import com.hospital.dto.LoginRequest;

public interface AuthService {
    AuthResponse login(LoginRequest request);
}
