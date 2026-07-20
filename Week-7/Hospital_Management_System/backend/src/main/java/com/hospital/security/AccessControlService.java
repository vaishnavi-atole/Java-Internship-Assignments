package com.hospital.security;

import com.hospital.entity.Appointment;
import com.hospital.entity.Doctor;
import com.hospital.entity.Prescription;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccessControlService {
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final PrescriptionRepository prescriptionRepository;

    public boolean hasRole(String role) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.getAuthorities().stream()
            .anyMatch(authority -> authority.getAuthority().equals("ROLE_" + role));
    }

    public boolean isDoctor() { return hasRole("DOCTOR"); }

    public Doctor currentDoctor() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return doctorRepository.findByEmailIgnoreCase(username)
            .orElseThrow(() -> new ResourceNotFoundException("No doctor profile is linked to this account"));
    }

    public void requireOwnDoctor(Long doctorId) {
        if (isDoctor() && !currentDoctor().getId().equals(doctorId)) {
            throw new AccessDeniedException("You can only access your own doctor profile");
        }
    }

    public void requireOwnAppointment(Appointment appointment) {
        requireOwnDoctor(appointment.getDoctor().getId());
    }

    public void requireOwnPrescription(Prescription prescription) {
        requireOwnDoctor(prescription.getDoctor().getId());
    }

    public boolean canAccessPatient(Long patientId) {
        return !isDoctor() || appointmentRepository.existsByDoctor_IdAndPatient_Id(currentDoctor().getId(), patientId);
    }

    public List<Appointment> ownAppointments() {
        return appointmentRepository.findByDoctor_Id(currentDoctor().getId());
    }

    public List<Prescription> ownPrescriptions() {
        return prescriptionRepository.findByDoctor_Id(currentDoctor().getId());
    }
}
