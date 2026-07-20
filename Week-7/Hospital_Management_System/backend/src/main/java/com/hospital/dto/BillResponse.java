package com.hospital.dto;

import lombok.Data;

@Data
public class BillResponse {
    private Long id;
    private String billNumber;
    private Long patientId;
    private String patientName;
    private double consultationFee;
    private double medicineFee;
    private double labFee;
    private double discount;
    private double gst;
    private double totalAmount;
    private String paymentStatus;
}
