package com.hospital.service;

import com.hospital.dto.DoctorRequest;
import com.hospital.dto.DoctorResponse;

import java.util.List;

public interface DoctorService {
    DoctorResponse create(DoctorRequest request);
    DoctorResponse update(Long id, DoctorRequest request);
    DoctorResponse findById(Long id);
    List<DoctorResponse> findAll();
    void delete(Long id);
}
