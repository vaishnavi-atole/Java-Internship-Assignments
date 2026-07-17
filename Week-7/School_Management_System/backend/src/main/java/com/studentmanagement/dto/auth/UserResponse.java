package com.studentmanagement.dto.auth;

import com.studentmanagement.entity.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponse {
    private final Long id;
    private final String name;
    private final String email;
    private final Role role;
}
