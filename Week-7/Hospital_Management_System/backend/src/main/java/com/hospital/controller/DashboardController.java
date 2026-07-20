package com.hospital.controller;

import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DepartmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.security.AccessControlService;
import com.hospital.response.ApiResponse;
import com.hospital.enums.AppointmentStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.Instant;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private static final DateTimeFormatter MONTH_LABEL_FORMATTER = DateTimeFormatter.ofPattern("MMM", Locale.ENGLISH);
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final AccessControlService accessControlService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','RECEPTIONIST')")
    public ApiResponse<Map<String, Object>> summary() {
        Map<String, Object> data = new LinkedHashMap<>();
        if (accessControlService.isDoctor()) {
            var doctor = accessControlService.currentDoctor();
            var appointments = accessControlService.ownAppointments();
            var today = LocalDate.now().toString();
            data.put("totalPatients", appointments.stream().filter(appointment -> today.equals(appointment.getAppointmentDate()) && appointment.getStatus() != AppointmentStatus.CANCELLED).map(appointment -> appointment.getPatient().getId()).distinct().count());
            data.put("totalDoctors", 1L);
            data.put("totalDepartments", 1L);
            data.put("todayAppointments", appointments.stream().filter(appointment -> today.equals(appointment.getAppointmentDate()) && appointment.getStatus() != AppointmentStatus.CANCELLED).count());
            data.put("pendingConsultations", appointments.stream().filter(appointment -> appointment.getStatus() == AppointmentStatus.SCHEDULED).count());
            data.put("monthlyAppointments", monthlyAppointments(appointments));
        } else {
            data.put("totalPatients", patientRepository.count());
            data.put("totalDoctors", doctorRepository.countByActiveTrue());
            data.put("totalDepartments", departmentRepository.count());
            data.put("todayAppointments", appointmentRepository.countByAppointmentDateAndStatusNot(LocalDate.now().toString(), AppointmentStatus.CANCELLED));
            data.put("pendingConsultations", 0L);
            data.put("monthlyAppointments", monthlyAppointments(appointmentRepository.findAll()));
        }
        return new ApiResponse<>(true, "Dashboard data loaded", data, Instant.now());
    }

    private List<Map<String, Object>> monthlyAppointments(List<com.hospital.entity.Appointment> appointments) {
        YearMonth currentMonth = YearMonth.now();
        Map<YearMonth, Long> counts = new LinkedHashMap<>();
        for (int offset = 5; offset >= 0; offset--) {
            counts.put(currentMonth.minusMonths(offset), 0L);
        }

        appointments.forEach(appointment -> {
            if (appointment.getStatus() == AppointmentStatus.CANCELLED || appointment.getAppointmentDate() == null) {
                return;
            }
            try {
                YearMonth appointmentMonth = YearMonth.from(LocalDate.parse(appointment.getAppointmentDate()));
                if (counts.containsKey(appointmentMonth)) {
                    counts.computeIfPresent(appointmentMonth, (month, count) -> count + 1);
                }
            } catch (DateTimeParseException ignored) {
                // Ignore legacy records that do not contain an ISO-8601 appointment date.
            }
        });

        List<Map<String, Object>> series = new ArrayList<>();
        counts.forEach((month, count) -> series.add(Map.of(
            "label", month.format(MONTH_LABEL_FORMATTER),
            "count", count
        )));
        return series;
    }
}
