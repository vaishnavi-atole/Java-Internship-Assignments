package com.studentmanagement.dto.dashboard;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DepartmentCountResponse {
    private final String department;
    private final long total;
}
