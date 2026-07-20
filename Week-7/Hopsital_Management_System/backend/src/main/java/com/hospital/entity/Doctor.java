package com.hospital.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "doctors")
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String qualification;
    private String specialization;
    @ManyToOne(fetch = FetchType.EAGER)
    private Department department;
    private int experienceYears;
    private String phone;
    private String email;
    private String availability;
    private double consultationFee;
    private String photoUrl;
    private boolean active = true;
}
