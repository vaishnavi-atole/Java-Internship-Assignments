package com.hospital.controller;

import com.hospital.dto.BillRequest;
import com.hospital.dto.BillResponse;
import com.hospital.response.ApiResponse;
import com.hospital.service.BillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/bills")
@RequiredArgsConstructor
public class BillController {
    private final BillService billService;

    @PostMapping
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public ResponseEntity<ApiResponse<BillResponse>> create(@Valid @RequestBody BillRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Bill created", billService.create(request), Instant.now()));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','RECEPTIONIST')")
    public ResponseEntity<ApiResponse<List<BillResponse>>> findAll() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Bills loaded", billService.findAll(), Instant.now()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','RECEPTIONIST')")
    public ResponseEntity<ApiResponse<BillResponse>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Bill loaded", billService.findById(id), Instant.now()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public ResponseEntity<ApiResponse<BillResponse>> update(@PathVariable Long id, @Valid @RequestBody BillRequest request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Bill updated", billService.update(id, request), Instant.now()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("denyAll()")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        billService.delete(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Bill deleted", null, Instant.now()));
    }
}
