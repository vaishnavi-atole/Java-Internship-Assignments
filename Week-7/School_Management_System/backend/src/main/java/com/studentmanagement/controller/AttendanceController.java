package com.studentmanagement.controller;

import com.studentmanagement.dto.attendance.AttendanceRequest;
import com.studentmanagement.dto.attendance.AttendanceResponse;
import com.studentmanagement.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    @PutMapping("/students/{studentId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<AttendanceResponse> mark(@PathVariable Long studentId,
                                                    @Valid @RequestBody AttendanceRequest request) {
        return ResponseEntity.ok(attendanceService.mark(studentId, request));
    }

    @GetMapping("/students/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<AttendanceResponse>> getForStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceService.getForStudent(studentId));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<AttendanceResponse>> getMine() {
        return ResponseEntity.ok(attendanceService.getForCurrentStudent());
    }
}
