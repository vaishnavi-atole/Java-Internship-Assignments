package com.hospital.service.impl;

import com.hospital.dto.PatientRequest;
import com.hospital.dto.PatientResponse;
import com.hospital.entity.Patient;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.exception.InvalidRequestException;
import com.hospital.repository.PatientRepository;
import com.hospital.security.AccessControlService;
import com.hospital.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeParseException;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;
    private final AccessControlService accessControlService;

    @Override
    public PatientResponse create(PatientRequest request) {
        Patient patient = modelMapper.map(request, Patient.class);
        applyDateOfBirth(patient, request.getDob());
        Patient saved = patientRepository.save(patient);
        if (saved.getPatientId() == null || saved.getPatientId().isBlank()) {
            saved.setPatientId("PAT-%06d".formatted(saved.getId()));
            saved = patientRepository.save(saved);
        }
        return modelMapper.map(saved, PatientResponse.class);
    }

    @Override
    public PatientResponse update(Long id, PatientRequest request) {
        Patient patient = patientRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setGender(request.getGender());
        applyDateOfBirth(patient, request.getDob());
        patient.setBloodGroup(request.getBloodGroup());
        patient.setPhone(request.getPhone());
        patient.setEmail(request.getEmail());
        patient.setAddress(request.getAddress());
        patient.setEmergencyContact(request.getEmergencyContact());
        patient.setMedicalHistory(request.getMedicalHistory());
        patient.setPhotoUrl(request.getPhotoUrl());
        patient.setActive(request.isActive());
        return modelMapper.map(patientRepository.save(patient), PatientResponse.class);
    }

    private void applyDateOfBirth(Patient patient, String dateOfBirth) {
        try {
            LocalDate dob = LocalDate.parse(dateOfBirth);
            if (dob.isAfter(LocalDate.now())) {
                throw new InvalidRequestException("Date of birth cannot be in the future");
            }
            patient.setDob(dob.toString());
            patient.setAge(Period.between(dob, LocalDate.now()).getYears());
        } catch (DateTimeParseException ex) {
            throw new InvalidRequestException("Date of birth must use the YYYY-MM-DD format");
        }
    }

    @Override
    public PatientResponse findById(Long id) {
        if (!accessControlService.canAccessPatient(id)) throw new org.springframework.security.access.AccessDeniedException("You can only access patients assigned to you");
        return patientRepository.findById(id).map(patient -> modelMapper.map(patient, PatientResponse.class)).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
    }

    @Override
    public List<PatientResponse> findAll() {
        return patientRepository.findAll().stream().filter(patient -> accessControlService.canAccessPatient(patient.getId())).map(patient -> modelMapper.map(patient, PatientResponse.class)).toList();
    }

    @Override
    public void delete(Long id) {
        Patient patient = patientRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        patientRepository.delete(patient);
    }
}
