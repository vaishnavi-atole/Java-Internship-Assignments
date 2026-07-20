package com.hospital.dto;

import lombok.Data;

@Data
public class PrescriptionResponse {
    private Long id;
    private String prescriptionNumber;
    private Long doctorId;
    private String doctorName;
    private Long patientId;
    private String patientName;
    private String medicine;
    private String dosage;
    private String duration;
    private String instructions;
    private String visitDate;
}
