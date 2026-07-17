package com.studentmanagement.dto.attendance;

import com.studentmanagement.entity.AttendanceStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class AttendanceResponse {
    private final Long id;
    private final Long studentId;
    private final String studentName;
    private final LocalDate date;
    private final AttendanceStatus status;
    private final String remarks;
    private final String markedBy;
    private final LocalDateTime updatedAt;
}
