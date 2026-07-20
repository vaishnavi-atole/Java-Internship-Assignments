package com.hospital.controller;

import com.hospital.dto.ReceptionistRequest;
import com.hospital.dto.ReceptionistResponse;
import com.hospital.entity.Role;
import com.hospital.entity.User;
import com.hospital.exception.DuplicateResourceException;
import com.hospital.repository.RoleRepository;
import com.hospital.repository.UserRepository;
import com.hospital.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class StaffController {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/receptionists")
    public ResponseEntity<ApiResponse<List<ReceptionistResponse>>> receptionists() {
        List<ReceptionistResponse> staff = userRepository.findAllByRole_Name("RECEPTIONIST").stream()
            .map(this::toResponse)
            .toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "Receptionists loaded", staff, Instant.now()));
    }

    @PostMapping("/receptionists")
    public ResponseEntity<ApiResponse<ReceptionistResponse>> createReceptionist(@Valid @RequestBody ReceptionistRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new DuplicateResourceException("Username is already in use");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Email is already in use");
        }

        Role role = roleRepository.findByName("RECEPTIONIST").orElseThrow();
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setRole(role);
        user.setEnabled(true);

        ReceptionistResponse response = toResponse(userRepository.save(user));
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Receptionist created", response, Instant.now()));
    }

    private ReceptionistResponse toResponse(User user) {
        return new ReceptionistResponse(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(), user.isEnabled());
    }
}
