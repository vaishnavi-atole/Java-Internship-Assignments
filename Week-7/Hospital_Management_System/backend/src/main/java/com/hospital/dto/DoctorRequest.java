package com.hospital.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class DoctorRequest {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String qualification;
    @NotBlank
    private String specialization;
    @NotNull
    private Long departmentId;
    @PositiveOrZero
    private int experienceYears;
    @NotBlank
    @Pattern(regexp = "^[0-9+() -]{7,20}$", message = "Phone number must contain 7 to 20 valid characters")
    private String phone;
    @NotBlank
    @Email
    private String email;
    private String password;
    @NotBlank
    @Pattern(regexp = "YES|NO", message = "Availability must be YES or NO")
    private String availability;
    @PositiveOrZero
    private double consultationFee;
    private String photoUrl;
    private boolean active = true;
}
