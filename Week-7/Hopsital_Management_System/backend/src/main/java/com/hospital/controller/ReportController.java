package com.hospital.controller;

import com.hospital.dto.AppointmentResponse;
import com.hospital.dto.BillResponse;
import com.hospital.dto.DoctorResponse;
import com.hospital.dto.PatientResponse;
import com.hospital.response.ApiResponse;
import com.hospital.service.AppointmentService;
import com.hospital.service.BillService;
import com.hospital.service.DoctorService;
import com.hospital.service.PatientService;
import com.hospital.security.AccessControlService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
    private final PatientService patientService;
    private final DoctorService doctorService;
    private final AppointmentService appointmentService;
    private final BillService billService;
    private final AccessControlService accessControlService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ApiResponse<Map<String, Object>> report() {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("patients", patientService.findAll());
        data.put("doctors", doctorService.findAll());
        data.put("appointments", appointmentService.findAll());
        data.put("bills", accessControlService.isDoctor() ? List.of() : billService.findAll());
        return new ApiResponse<>(true, "Reports generated", data, Instant.now());
    }
}
