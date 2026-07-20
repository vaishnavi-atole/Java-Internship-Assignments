package com.hospital.service.impl;

import com.hospital.dto.PrescriptionRequest;
import com.hospital.dto.PrescriptionResponse;
import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.entity.Prescription;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.repository.PrescriptionRepository;
import com.hospital.security.AccessControlService;
import com.hospital.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PrescriptionServiceImpl implements PrescriptionService {
    private final PrescriptionRepository prescriptionRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;
    private final AccessControlService accessControlService;

    @Override
    public PrescriptionResponse create(PrescriptionRequest request) {
        accessControlService.requireOwnDoctor(request.getDoctorId());
        Prescription prescription = new Prescription();
        Doctor doctor = doctorRepository.findById(request.getDoctorId()).orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        Patient patient = patientRepository.findById(request.getPatientId()).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        prescription.setDoctor(doctor);
        prescription.setPatient(patient);
        prescription.setPrescriptionNumber(request.getPrescriptionNumber());
        prescription.setMedicine(request.getMedicine());
        prescription.setDosage(request.getDosage());
        prescription.setDuration(request.getDuration());
        prescription.setInstructions(request.getInstructions());
        prescription.setVisitDate(request.getVisitDate());
        return mapToResponse(prescriptionRepository.save(prescription));
    }

    @Override
    public PrescriptionResponse update(Long id, PrescriptionRequest request) {
        Prescription prescription = prescriptionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Prescription not found"));
        accessControlService.requireOwnPrescription(prescription);
        accessControlService.requireOwnDoctor(request.getDoctorId());
        Doctor doctor = doctorRepository.findById(request.getDoctorId()).orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        Patient patient = patientRepository.findById(request.getPatientId()).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        prescription.setDoctor(doctor);
        prescription.setPatient(patient);
        prescription.setMedicine(request.getMedicine());
        prescription.setDosage(request.getDosage());
        prescription.setDuration(request.getDuration());
        prescription.setInstructions(request.getInstructions());
        prescription.setVisitDate(request.getVisitDate());
        return mapToResponse(prescriptionRepository.save(prescription));
    }

    @Override
    public PrescriptionResponse findById(Long id) {
        Prescription prescription = prescriptionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Prescription not found"));
        accessControlService.requireOwnPrescription(prescription);
        return mapToResponse(prescription);
    }

    @Override
    public List<PrescriptionResponse> findAll() {
        return (accessControlService.isDoctor() ? accessControlService.ownPrescriptions() : prescriptionRepository.findAll()).stream().map(this::mapToResponse).toList();
    }

    @Override
    public void delete(Long id) {
        Prescription prescription = prescriptionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Prescription not found"));
        accessControlService.requireOwnPrescription(prescription);
        prescriptionRepository.delete(prescription);
    }

    private PrescriptionResponse mapToResponse(Prescription prescription) {
        PrescriptionResponse response = new PrescriptionResponse();
        response.setId(prescription.getId());
        response.setPrescriptionNumber(prescription.getPrescriptionNumber());
        response.setDoctorId(prescription.getDoctor().getId());
        response.setDoctorName(prescription.getDoctor().getFirstName() + " " + prescription.getDoctor().getLastName());
        response.setPatientId(prescription.getPatient().getId());
        response.setPatientName(prescription.getPatient().getFirstName() + " " + prescription.getPatient().getLastName());
        response.setMedicine(prescription.getMedicine());
        response.setDosage(prescription.getDosage());
        response.setDuration(prescription.getDuration());
        response.setInstructions(prescription.getInstructions());
        response.setVisitDate(prescription.getVisitDate());
        return response;
    }
}
