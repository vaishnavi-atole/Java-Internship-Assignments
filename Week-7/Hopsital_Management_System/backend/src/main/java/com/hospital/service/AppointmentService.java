package com.hospital.service;

import com.hospital.dto.AppointmentRequest;
import com.hospital.dto.AppointmentResponse;

import java.util.List;

public interface AppointmentService {
    AppointmentResponse create(AppointmentRequest request);
    AppointmentResponse update(Long id, AppointmentRequest request);
    AppointmentResponse complete(Long id);
    AppointmentResponse findById(Long id);
    List<AppointmentResponse> findAll();
    void delete(Long id);
}
