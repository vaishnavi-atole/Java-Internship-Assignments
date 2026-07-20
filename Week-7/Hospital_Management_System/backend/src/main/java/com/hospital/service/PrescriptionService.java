package com.hospital.service;

import com.hospital.dto.PrescriptionRequest;
import com.hospital.dto.PrescriptionResponse;

import java.util.List;

public interface PrescriptionService {
    PrescriptionResponse create(PrescriptionRequest request);
    PrescriptionResponse update(Long id, PrescriptionRequest request);
    PrescriptionResponse findById(Long id);
    List<PrescriptionResponse> findAll();
    void delete(Long id);
}
