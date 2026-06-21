package com.security.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.security.entity.User;

/**
 * Repository interface for User entity.
 * JpaRepository provides CRUD operations.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	 /**
     * Find user by username.
     */
    Optional<User> findByUsername(String username);

    /**
     * Check whether username already exists.
     */
    boolean existsByUsername(String username);
	
}
