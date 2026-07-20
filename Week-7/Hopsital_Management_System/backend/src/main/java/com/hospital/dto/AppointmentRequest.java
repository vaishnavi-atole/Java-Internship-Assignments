package com.hospital.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AppointmentRequest {
    @NotNull
    private Long doctorId;
    @NotNull
    private Long patientId;
    @NotBlank
    private String appointmentDate;
    @NotBlank
    private String appointmentTime;
    @NotBlank
    private String reason;
    @NotBlank
    private String status;
}
