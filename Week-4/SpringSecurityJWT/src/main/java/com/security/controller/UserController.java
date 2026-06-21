package com.security.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Protected APIs
 * Used to test Role-Based Access Control.
 */
@RestController
public class UserController {

    /**
     * Accessible by USER and ADMIN.
     */
    @GetMapping("/user/profile")
    public String userProfile() {

        return "Welcome User";
    }

    /**
     * Accessible only by ADMIN.
     */
    @GetMapping("/admin/dashboard")
    public String adminDashboard() {

        return "Welcome Admin";
    }
}
