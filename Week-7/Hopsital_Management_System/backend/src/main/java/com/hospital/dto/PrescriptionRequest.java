package com.hospital.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PrescriptionRequest {
    private String prescriptionNumber;
    @NotNull
    private Long doctorId;
    @NotNull
    private Long patientId;
    @NotBlank
    private String medicine;
    @NotBlank
    private String dosage;
    @NotBlank
    private String duration;
    private String instructions;
    private String visitDate;
}
