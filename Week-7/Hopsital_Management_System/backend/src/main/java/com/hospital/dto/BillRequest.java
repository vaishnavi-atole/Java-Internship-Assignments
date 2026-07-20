package com.hospital.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BillRequest {
    private String billNumber;
    @NotNull
    private Long patientId;
    private double consultationFee;
    private double medicineFee;
    private double labFee;
    private double discount;
    private double gst;
    private String paymentStatus;
}
