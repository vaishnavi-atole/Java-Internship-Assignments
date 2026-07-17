package com.studentmanagement.service;

import com.studentmanagement.dto.auth.AuthResponse;
import com.studentmanagement.dto.auth.CreateTeacherRequest;
import com.studentmanagement.dto.auth.LoginRequest;
import com.studentmanagement.dto.auth.UserResponse;

import java.util.List;

public interface AuthService {
    AuthResponse login(LoginRequest request);

    UserResponse currentUser();

    UserResponse createTeacherAccount(CreateTeacherRequest request);

    List<UserResponse> getTeacherAccounts();

    void deleteTeacherAccount(Long teacherId);
}
