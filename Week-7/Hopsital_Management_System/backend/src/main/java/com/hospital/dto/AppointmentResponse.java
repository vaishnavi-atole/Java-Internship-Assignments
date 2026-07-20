package com.hospital.dto;

import lombok.Data;

@Data
public class AppointmentResponse {
    private Long id;
    private Long doctorId;
    private String doctorName;
    private Long patientId;
    private String patientName;
    private String appointmentDate;
    private String appointmentTime;
    private String reason;
    private String status;
}
