package com.hospital.service.impl;

import com.hospital.dto.BillRequest;
import com.hospital.dto.BillResponse;
import com.hospital.entity.Bill;
import com.hospital.entity.Patient;
import com.hospital.enums.PaymentStatus;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.BillRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.service.BillService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements BillService {
    private final BillRepository billRepository;
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    @Override
    public BillResponse create(BillRequest request) {
        Bill bill = new Bill();
        Patient patient = patientRepository.findById(request.getPatientId()).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        bill.setBillNumber(request.getBillNumber());
        bill.setPatient(patient);
        bill.setConsultationFee(request.getConsultationFee());
        bill.setMedicineFee(request.getMedicineFee());
        bill.setLabFee(request.getLabFee());
        bill.setDiscount(request.getDiscount());
        bill.setGst(request.getGst());
        bill.setTotalAmount(request.getConsultationFee() + request.getMedicineFee() + request.getLabFee() - request.getDiscount() + request.getGst());
        bill.setPaymentStatus(PaymentStatus.valueOf(request.getPaymentStatus().toUpperCase()));
        return mapToResponse(billRepository.save(bill));
    }

    @Override
    public BillResponse update(Long id, BillRequest request) {
        Bill bill = billRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Bill not found"));
        Patient patient = patientRepository.findById(request.getPatientId()).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        bill.setPatient(patient);
        bill.setConsultationFee(request.getConsultationFee());
        bill.setMedicineFee(request.getMedicineFee());
        bill.setLabFee(request.getLabFee());
        bill.setDiscount(request.getDiscount());
        bill.setGst(request.getGst());
        bill.setTotalAmount(request.getConsultationFee() + request.getMedicineFee() + request.getLabFee() - request.getDiscount() + request.getGst());
        bill.setPaymentStatus(PaymentStatus.valueOf(request.getPaymentStatus().toUpperCase()));
        return mapToResponse(billRepository.save(bill));
    }

    @Override
    public BillResponse findById(Long id) {
        return billRepository.findById(id).map(this::mapToResponse).orElseThrow(() -> new ResourceNotFoundException("Bill not found"));
    }

    @Override
    public List<BillResponse> findAll() {
        return billRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    @Override
    public void delete(Long id) {
        Bill bill = billRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Bill not found"));
        billRepository.delete(bill);
    }

    private BillResponse mapToResponse(Bill bill) {
        BillResponse response = new BillResponse();
        response.setId(bill.getId());
        response.setBillNumber(bill.getBillNumber());
        response.setPatientId(bill.getPatient().getId());
        response.setPatientName(bill.getPatient().getFirstName() + " " + bill.getPatient().getLastName());
        response.setConsultationFee(bill.getConsultationFee());
        response.setMedicineFee(bill.getMedicineFee());
        response.setLabFee(bill.getLabFee());
        response.setDiscount(bill.getDiscount());
        response.setGst(bill.getGst());
        response.setTotalAmount(bill.getTotalAmount());
        response.setPaymentStatus(bill.getPaymentStatus().name());
        return response;
    }
}
