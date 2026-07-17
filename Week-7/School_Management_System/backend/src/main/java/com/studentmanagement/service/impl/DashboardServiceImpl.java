package com.studentmanagement.service.impl;

import com.studentmanagement.dto.dashboard.DashboardStatsResponse;
import com.studentmanagement.dto.dashboard.DepartmentCountResponse;
import com.studentmanagement.dto.student.StudentResponse;
import com.studentmanagement.entity.Gender;
import com.studentmanagement.entity.Role;
import com.studentmanagement.mapper.StudentMapper;
import com.studentmanagement.repository.StudentRepository;
import com.studentmanagement.repository.UserRepository;
import com.studentmanagement.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final StudentMapper studentMapper;

    @Override
    public DashboardStatsResponse getDashboardStats() {
        List<DepartmentCountResponse> departmentCounts = studentRepository.countStudentsByDepartment()
                .stream()
                .map(row -> DepartmentCountResponse.builder()
                        .department(String.valueOf(row[0]))
                        .total(((Number) row[1]).longValue())
                        .build())
                .toList();

        List<StudentResponse> recentStudents = studentRepository.findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(studentMapper::toResponse)
                .toList();

        return DashboardStatsResponse.builder()
                .totalStudents(studentRepository.count())
                .totalTeachers(userRepository.countByRole(Role.TEACHER))
                .maleStudents(studentRepository.countByGender(Gender.MALE))
                .femaleStudents(studentRepository.countByGender(Gender.FEMALE))
                .departmentCounts(departmentCounts)
                .recentStudents(recentStudents)
                .build();
    }
}
