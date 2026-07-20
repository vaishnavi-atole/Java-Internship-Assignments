package com.hospital.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class PatientRequest {
    private String patientId;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    @Pattern(regexp = "MALE|FEMALE", message = "Gender must be MALE or FEMALE")
    private String gender;
    @NotBlank
    private String dob;
    private int age;
    private String bloodGroup;
    @NotBlank
    @Pattern(regexp = "^[0-9+() -]{7,20}$", message = "Phone number must contain 7 to 20 valid characters")
    private String phone;
    @Email
    private String email;
    private String address;
    private String emergencyContact;
    private String medicalHistory;
    private String photoUrl;
    private boolean active = true;
}
