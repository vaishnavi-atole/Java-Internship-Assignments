package com.hospital.service.impl;

import com.hospital.dto.DoctorRequest;
import com.hospital.dto.DoctorResponse;
import com.hospital.entity.Department;
import com.hospital.entity.Doctor;
import com.hospital.entity.Role;
import com.hospital.entity.User;
import com.hospital.exception.DuplicateResourceException;
import com.hospital.exception.InvalidRequestException;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.DepartmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.RoleRepository;
import com.hospital.repository.UserRepository;
import com.hospital.security.AccessControlService;
import com.hospital.service.DoctorService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
    private final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final AccessControlService accessControlService;

    @Override
    @Transactional
    public DoctorResponse create(DoctorRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            throw new DuplicateResourceException("Email is already in use");
        }

        Doctor doctor = modelMapper.map(request, Doctor.class);
        doctor.setEmail(normalizedEmail);
        Department department = departmentRepository.findById(request.getDepartmentId()).orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        doctor.setDepartment(department);
        Doctor savedDoctor = doctorRepository.save(doctor);

        syncDoctorUser(savedDoctor, request.getPassword(), true);

        return mapToResponse(savedDoctor);
    }

    @Override
    @Transactional
    public DoctorResponse update(Long id, DoctorRequest request) {
        accessControlService.requireOwnDoctor(id);
        Doctor doctor = doctorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        doctor.setFirstName(request.getFirstName());
        doctor.setLastName(request.getLastName());
        doctor.setQualification(request.getQualification());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setExperienceYears(request.getExperienceYears());
        doctor.setPhone(request.getPhone());
        doctor.setEmail(request.getEmail().trim().toLowerCase());
        doctor.setAvailability(request.getAvailability());
        doctor.setConsultationFee(request.getConsultationFee());
        doctor.setPhotoUrl(request.getPhotoUrl());
        doctor.setActive(request.isActive());
        Department department = departmentRepository.findById(request.getDepartmentId()).orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        doctor.setDepartment(department);
        Doctor savedDoctor = doctorRepository.save(doctor);
        syncDoctorUser(savedDoctor, request.getPassword(), false);
        return mapToResponse(savedDoctor);
    }

    @Override
    public DoctorResponse findById(Long id) {
        accessControlService.requireOwnDoctor(id);
        return doctorRepository.findById(id).map(this::mapToResponse).orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
    }

    @Override
    public List<DoctorResponse> findAll() {
        return (accessControlService.isDoctor() ? List.of(accessControlService.currentDoctor()) : doctorRepository.findAll())
            .stream().map(this::mapToResponse).toList();
    }

    @Override
    public void delete(Long id) {
        Doctor doctor = doctorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        doctorRepository.delete(doctor);
    }

    private DoctorResponse mapToResponse(Doctor doctor) {
        DoctorResponse response = modelMapper.map(doctor, DoctorResponse.class);
        response.setDepartmentId(doctor.getDepartment().getId());
        response.setDepartmentName(doctor.getDepartment().getName());
        return response;
    }

    private void syncDoctorUser(Doctor doctor, String password, boolean creatingDoctor) {
        String normalizedEmail = doctor.getEmail().trim().toLowerCase();
        User doctorUser = userRepository.findByEmail(normalizedEmail).orElse(null);
        if (doctorUser == null) {
            if (password == null || password.isBlank()) {
                throw new InvalidRequestException("A password is required to create the doctor login");
            }
            doctorUser = new User();
            doctorUser.setUsername(normalizedEmail);
            doctorUser.setEmail(normalizedEmail);
            doctorUser.setRole(roleRepository.findByName("DOCTOR").orElseThrow(() -> new ResourceNotFoundException("Doctor role not found")));
            doctorUser.setEnabled(true);
        }
        doctorUser.setFirstName(doctor.getFirstName());
        doctorUser.setLastName(doctor.getLastName());
        if (password != null && !password.isBlank()) {
            doctorUser.setPassword(passwordEncoder.encode(password));
        } else if (creatingDoctor) {
            throw new InvalidRequestException("A password is required to create the doctor login");
        }
        userRepository.save(doctorUser);
    }
}
