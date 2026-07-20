package com.hospital.dto;

import lombok.Data;

@Data
public class PatientResponse {
    private Long id;
    private String patientId;
    private String firstName;
    private String lastName;
    private String gender;
    private String dob;
    private int age;
    private String bloodGroup;
    private String phone;
    private String email;
    private String address;
    private String emergencyContact;
    private String medicalHistory;
    private String photoUrl;
    private boolean active;
}
