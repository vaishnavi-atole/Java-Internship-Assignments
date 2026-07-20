package com.hospital.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DepartmentRequest {
    @NotBlank
    private String name;
    private String description;
    private String departmentHead;
    private boolean active = true;
}
