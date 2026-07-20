package com.hospital.service;

import com.hospital.dto.PatientRequest;
import com.hospital.dto.PatientResponse;

import java.util.List;

public interface PatientService {
    PatientResponse create(PatientRequest request);
    PatientResponse update(Long id, PatientRequest request);
    PatientResponse findById(Long id);
    List<PatientResponse> findAll();
    void delete(Long id);
}
