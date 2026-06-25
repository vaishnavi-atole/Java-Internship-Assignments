package com.security.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.security.entity.User;
import com.security.service.UserService;

import lombok.RequiredArgsConstructor;

/**
 * Protected APIs
 * Used to test Role-Based Access Control.
 */
@RestController
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;

    /**
     * Accessible by USER and ADMIN.
     */
    @GetMapping("/user/profile")
    public String userProfile(Authentication authentication) {

        return "Logged in User : " + authentication.getName();
    }


    /**
     * Accessible only by ADMIN.
     */
    @GetMapping("/admin/dashboard")
    public String adminDashboard() {

        return "Welcome Admin";
    }
    
    // Get all users
    @GetMapping("/admin/users")
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }
 // Get user by id
    @GetMapping("/admin/users/{id}")
    public User getUserById(@PathVariable Long id) {

        return userService.getUserById(id);
    }
    // Update user
    @PutMapping("/admin/users/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        return userService.updateUser(id, user);
    }

    // Delete user
    @DeleteMapping("/admin/users/{id}")
    public String deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return "User deleted successfully";
    }
}
