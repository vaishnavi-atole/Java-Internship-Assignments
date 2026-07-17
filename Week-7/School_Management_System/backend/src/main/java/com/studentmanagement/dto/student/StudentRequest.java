package com.studentmanagement.dto.student;

import com.studentmanagement.entity.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class StudentRequest {

    @NotBlank
    @Size(min = 2, max = 100)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 100)
    private String lastName;

    @NotBlank
    @Email
    @Size(max = 150)
    private String email;

    @NotBlank
    @Pattern(regexp = "^[0-9+()\\-\\s]{7,20}$", message = "must contain 7 to 20 valid phone characters")
    private String phone;

    @NotNull
    private Gender gender;

    @PastOrPresent
    private LocalDate dateOfBirth;

    @NotBlank
    @Size(max = 100)
    private String department;

    @NotBlank
    @Size(max = 100)
    private String course;

    @NotBlank
    @Pattern(regexp = "^[1-9][0-9]?$", message = "must be a number from 1 to 99")
    private String semester;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9-]{1,10}$", message = "must contain 1 to 10 letters, numbers, or hyphen characters")
    private String section;

    @NotBlank
    @Size(max = 1000)
    private String address;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d).{8,100}$", message = "must be 8 to 100 characters and include at least one letter and one number")
    private String loginPassword;
}
