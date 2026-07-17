package com.studentmanagement.service;

import com.studentmanagement.dto.attendance.AttendanceRequest;
import com.studentmanagement.dto.attendance.AttendanceResponse;

import java.util.List;

public interface AttendanceService {
    AttendanceResponse mark(Long studentId, AttendanceRequest request);
    List<AttendanceResponse> getForStudent(Long studentId);
    List<AttendanceResponse> getForCurrentStudent();
}
