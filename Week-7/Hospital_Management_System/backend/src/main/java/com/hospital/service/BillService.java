package com.hospital.service;

import com.hospital.dto.BillRequest;
import com.hospital.dto.BillResponse;

import java.util.List;

public interface BillService {
    BillResponse create(BillRequest request);
    BillResponse update(Long id, BillRequest request);
    BillResponse findById(Long id);
    List<BillResponse> findAll();
    void delete(Long id);
}
