package com.hospital.dto;

import lombok.Data;

@Data
public class DoctorResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String qualification;
    private String specialization;
    private Long departmentId;
    private String departmentName;
    private int experienceYears;
    private String phone;
    private String email;
    private String availability;
    private double consultationFee;
    private String photoUrl;
    private boolean active;
}
