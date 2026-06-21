package com.security.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class representing application users.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    /**
     * Primary Key
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Username used for login.
     * Must be unique.
     */
    @Column(nullable = false, unique = true)
    private String username;

    /**
     * Password stored in encrypted form.
     */
    @Column(nullable = false)
    private String password;

    /**
     * User role (USER / ADMIN).
     */
    @Enumerated(EnumType.STRING)
    private Role role;
}