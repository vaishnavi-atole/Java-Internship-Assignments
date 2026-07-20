package com.hospital.controller;

import com.hospital.response.ApiResponse;
import com.hospital.service.AppointmentService;
import com.hospital.service.DepartmentService;
import com.hospital.service.DoctorService;
import com.hospital.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {
    private final DoctorService doctorService;
    private final PatientService patientService;
    private final AppointmentService appointmentService;
    private final DepartmentService departmentService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','RECEPTIONIST')")
    public ApiResponse<Map<String, Object>> search(@RequestParam String query) {
        String term = query == null ? "" : query.trim().toLowerCase(Locale.ROOT);
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("doctors", doctorService.findAll().stream().filter(item -> contains(item.getFirstName(), term) || contains(item.getLastName(), term) || contains(item.getEmail(), term)).toList());
        data.put("patients", patientService.findAll().stream().filter(item -> contains(item.getFirstName(), term) || contains(item.getLastName(), term) || contains(item.getPatientId(), term) || contains(item.getPhone(), term)).toList());
        data.put("appointments", appointmentService.findAll().stream().filter(item -> contains(item.getPatientName(), term) || contains(item.getDoctorName(), term)).toList());
        data.put("departments", departmentService.findAll().stream().filter(item -> contains(item.getName(), term) || contains(item.getDepartmentHead(), term)).toList());
        return new ApiResponse<>(true, "Search completed", data, Instant.now());
    }

    private boolean contains(String value, String term) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(term);
    }
}
