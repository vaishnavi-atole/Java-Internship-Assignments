package com.hospital.repository;

import com.hospital.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    long countByActiveTrue();
    Optional<Doctor> findByEmailIgnoreCase(String email);
}
