package com.studentmanagement.service;

import com.studentmanagement.dto.student.StudentRequest;
import com.studentmanagement.dto.student.StudentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentService {
    StudentResponse createStudent(StudentRequest request);

    StudentResponse updateStudent(Long id, StudentRequest request);

    void deleteStudent(Long id);

    StudentResponse getStudent(Long id);

    StudentResponse getCurrentStudent();

    Page<StudentResponse> getStudents(String keyword, Pageable pageable);
}
