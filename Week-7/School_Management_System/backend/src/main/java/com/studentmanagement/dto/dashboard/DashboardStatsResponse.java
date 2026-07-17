package com.studentmanagement.dto.dashboard;

import com.studentmanagement.dto.student.StudentResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class DashboardStatsResponse {
    private final long totalStudents;
    private final long totalTeachers;
    private final long maleStudents;
    private final long femaleStudents;
    private final List<DepartmentCountResponse> departmentCounts;
    private final List<StudentResponse> recentStudents;
}
