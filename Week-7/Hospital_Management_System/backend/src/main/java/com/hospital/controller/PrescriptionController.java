package com.hospital.controller;

import com.hospital.dto.PrescriptionRequest;
import com.hospital.dto.PrescriptionResponse;
import com.hospital.response.ApiResponse;
import com.hospital.service.PrescriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {
    private final PrescriptionService prescriptionService;

    @PostMapping
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse<PrescriptionResponse>> create(@Valid @RequestBody PrescriptionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Prescription created", prescriptionService.create(request), Instant.now()));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ResponseEntity<ApiResponse<List<PrescriptionResponse>>> findAll() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Prescriptions loaded", prescriptionService.findAll(), Instant.now()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ResponseEntity<ApiResponse<PrescriptionResponse>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Prescription loaded", prescriptionService.findById(id), Instant.now()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse<PrescriptionResponse>> update(@PathVariable Long id, @Valid @RequestBody PrescriptionRequest request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Prescription updated", prescriptionService.update(id, request), Instant.now()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("denyAll()")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        prescriptionService.delete(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Prescription deleted", null, Instant.now()));
    }
}
