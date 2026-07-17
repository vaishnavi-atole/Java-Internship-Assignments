package com.studentmanagement.dto.attendance;

import com.studentmanagement.entity.AttendanceStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AttendanceRequest {
    @NotNull
    @PastOrPresent
    private LocalDate date;

    @NotNull
    private AttendanceStatus status;

    @Size(max = 500)
    private String remarks;
}
