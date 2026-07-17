package com.studentmanagement.controller;

import com.studentmanagement.dto.auth.AuthResponse;
import com.studentmanagement.dto.auth.CreateTeacherRequest;
import com.studentmanagement.dto.auth.LoginRequest;
import com.studentmanagement.dto.auth.UserResponse;
import com.studentmanagement.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> currentUser() {
        return ResponseEntity.ok(authService.currentUser());
    }

    @GetMapping("/admin/teachers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getTeachers() {
        return ResponseEntity.ok(authService.getTeacherAccounts());
    }

    @PostMapping("/admin/teachers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> createTeacher(@Valid @RequestBody CreateTeacherRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.createTeacherAccount(request));
    }

    @DeleteMapping("/admin/teachers/{teacherId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long teacherId) {
        authService.deleteTeacherAccount(teacherId);
        return ResponseEntity.noContent().build();
    }
}
