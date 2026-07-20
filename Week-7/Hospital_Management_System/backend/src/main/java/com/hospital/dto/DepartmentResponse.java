package com.hospital.dto;

import lombok.Data;

@Data
public class DepartmentResponse {
    private Long id;
    private String name;
    private String description;
    private String departmentHead;
    private boolean active;
}
