package com.studentmanagement.service.impl;

import com.studentmanagement.dto.attendance.AttendanceRequest;
import com.studentmanagement.dto.attendance.AttendanceResponse;
import com.studentmanagement.entity.Attendance;
import com.studentmanagement.entity.AttendanceStatus;
import com.studentmanagement.entity.Student;
import com.studentmanagement.entity.User;
import com.studentmanagement.exception.ResourceNotFoundException;
import com.studentmanagement.repository.AttendanceRepository;
import com.studentmanagement.repository.StudentRepository;
import com.studentmanagement.repository.UserRepository;
import com.studentmanagement.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AttendanceServiceImpl implements AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    @Override
    public AttendanceResponse mark(Long studentId, AttendanceRequest request) {
        if (request.getStatus() != AttendanceStatus.PRESENT && request.getStatus() != AttendanceStatus.ABSENT) {
            throw new IllegalArgumentException("Attendance status must be PRESENT or ABSENT");
        }

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User teacher = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated teacher not found"));
        Attendance attendance = attendanceRepository.findByStudentIdAndDate(studentId, request.getDate())
                .orElseGet(() -> Attendance.builder().student(student).date(request.getDate()).build());
        attendance.setStatus(request.getStatus());
        attendance.setRemarks(request.getRemarks());
        attendance.setMarkedBy(teacher);
        return toResponse(attendanceRepository.save(attendance));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceResponse> getForStudent(Long studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new ResourceNotFoundException("Student not found with id: " + studentId);
        }
        return attendanceRepository.findByStudentIdOrderByDateDesc(studentId).stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceResponse> getForCurrentStudent() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Student student = studentRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("No student record is linked to this account"));
        return getForStudent(student.getId());
    }

    private AttendanceResponse toResponse(Attendance attendance) {
        Student student = attendance.getStudent();
        return AttendanceResponse.builder()
                .id(attendance.getId())
                .studentId(student.getId())
                .studentName(student.getFirstName() + " " + student.getLastName())
                .date(attendance.getDate())
                .status(attendance.getStatus())
                .remarks(attendance.getRemarks())
                .markedBy(attendance.getMarkedBy().getName())
                .updatedAt(attendance.getUpdatedAt())
                .build();
    }
}
