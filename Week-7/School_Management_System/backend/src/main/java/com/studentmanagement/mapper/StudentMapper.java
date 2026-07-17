package com.studentmanagement.mapper;

import com.studentmanagement.dto.student.StudentRequest;
import com.studentmanagement.dto.student.StudentResponse;
import com.studentmanagement.entity.Student;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {

    public Student toEntity(StudentRequest request) {
        return Student.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .gender(request.getGender())
                .dateOfBirth(request.getDateOfBirth())
                .department(request.getDepartment())
                .course(request.getCourse())
                .semester(request.getSemester())
                .section(request.getSection())
                .address(request.getAddress())
                .build();
    }

    public void updateEntity(Student student, StudentRequest request) {
        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setGender(request.getGender());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setDepartment(request.getDepartment());
        student.setCourse(request.getCourse());
        student.setSemester(request.getSemester());
        student.setSection(request.getSection());
        student.setAddress(request.getAddress());
    }

    public StudentResponse toResponse(Student student) {
        return StudentResponse.builder()
                .id(student.getId())
                .studentId(student.getStudentId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .phone(student.getPhone())
                .gender(student.getGender())
                .dateOfBirth(student.getDateOfBirth())
                .department(student.getDepartment())
                .course(student.getCourse())
                .semester(student.getSemester())
                .section(student.getSection())
                .address(student.getAddress())
                .createdAt(student.getCreatedAt())
                .updatedAt(student.getUpdatedAt())
                .build();
    }
}
