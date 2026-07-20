package com.hospital.service.impl;

import com.hospital.dto.AppointmentRequest;
import com.hospital.dto.AppointmentResponse;
import com.hospital.entity.Appointment;
import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.enums.AppointmentStatus;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.exception.InvalidRequestException;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.security.AccessControlService;
import com.hospital.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;
    private final AccessControlService accessControlService;

    @Override
    public AppointmentResponse create(AppointmentRequest request) {
        Appointment appointment = new Appointment();
        Doctor doctor = doctorRepository.findById(request.getDoctorId()).orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        Patient patient = patientRepository.findById(request.getPatientId()).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        validateSchedule(request, doctor, null);
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setReason(request.getReason());
        appointment.setStatus(AppointmentStatus.SCHEDULED);
        return mapToResponse(appointmentRepository.save(appointment));
    }

    @Override
    public AppointmentResponse update(Long id, AppointmentRequest request) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        accessControlService.requireOwnAppointment(appointment);
        if (accessControlService.isDoctor() && (!appointment.getDoctor().getId().equals(request.getDoctorId()) || !appointment.getPatient().getId().equals(request.getPatientId()))) {
            throw new org.springframework.security.access.AccessDeniedException("Doctors cannot reassign appointments");
        }
        Doctor doctor = doctorRepository.findById(request.getDoctorId()).orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        Patient patient = patientRepository.findById(request.getPatientId()).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        validateSchedule(request, doctor, id);
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setReason(request.getReason());
        appointment.setStatus(AppointmentStatus.valueOf(request.getStatus().toUpperCase()));
        return mapToResponse(appointmentRepository.save(appointment));
    }

    @Override
    public AppointmentResponse complete(Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        accessControlService.requireOwnAppointment(appointment);
        if (appointment.getStatus() == AppointmentStatus.CANCELLED) {
            throw new InvalidRequestException("Cancelled appointments cannot be completed");
        }
        appointment.setStatus(AppointmentStatus.COMPLETED);
        return mapToResponse(appointmentRepository.save(appointment));
    }

    @Override
    public AppointmentResponse findById(Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        accessControlService.requireOwnAppointment(appointment);
        return mapToResponse(appointment);
    }

    @Override
    public List<AppointmentResponse> findAll() {
        return (accessControlService.isDoctor() ? accessControlService.ownAppointments() : appointmentRepository.findAll()).stream().map(this::mapToResponse).toList();
    }

    @Override
    public void delete(Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        accessControlService.requireOwnAppointment(appointment);
        appointmentRepository.delete(appointment);
    }

    private AppointmentResponse mapToResponse(Appointment appointment) {
        AppointmentResponse response = new AppointmentResponse();
        response.setId(appointment.getId());
        response.setDoctorId(appointment.getDoctor().getId());
        response.setDoctorName(appointment.getDoctor().getFirstName() + " " + appointment.getDoctor().getLastName());
        response.setPatientId(appointment.getPatient().getId());
        response.setPatientName(appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName());
        response.setAppointmentDate(appointment.getAppointmentDate());
        response.setAppointmentTime(appointment.getAppointmentTime());
        response.setReason(appointment.getReason());
        response.setStatus(appointment.getStatus().name());
        return response;
    }

    private void validateSchedule(AppointmentRequest request, Doctor doctor, Long appointmentId) {
        try {
            if (LocalDate.parse(request.getAppointmentDate()).isBefore(LocalDate.now())) {
                throw new InvalidRequestException("Appointments cannot be scheduled in the past");
            }
        } catch (DateTimeParseException ex) {
            throw new InvalidRequestException("Appointment date must use the YYYY-MM-DD format");
        }

        if (!doctor.isActive() || !"YES".equals(doctor.getAvailability())) {
            throw new InvalidRequestException("Selected doctor is not currently available for appointments");
        }

        boolean alreadyBooked = appointmentId == null
            ? appointmentRepository.existsByDoctor_IdAndAppointmentDateAndAppointmentTimeAndStatusNot(doctor.getId(), request.getAppointmentDate(), request.getAppointmentTime(), AppointmentStatus.CANCELLED)
            : appointmentRepository.existsByDoctor_IdAndAppointmentDateAndAppointmentTimeAndStatusNotAndIdNot(doctor.getId(), request.getAppointmentDate(), request.getAppointmentTime(), AppointmentStatus.CANCELLED, appointmentId);
        if (alreadyBooked) {
            throw new InvalidRequestException("This doctor already has an appointment at the selected time");
        }
    }
}
