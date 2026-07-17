package com.studentmanagement.dto.student;

import com.studentmanagement.entity.Gender;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class StudentResponse {
    private final Long id;
    private final String studentId;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String phone;
    private final Gender gender;
    private final LocalDate dateOfBirth;
    private final String department;
    private final String course;
    private final String semester;
    private final String section;
    private final String address;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;
}
