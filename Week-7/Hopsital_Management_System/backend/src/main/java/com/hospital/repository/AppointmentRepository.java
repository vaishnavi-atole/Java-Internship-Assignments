package com.hospital.repository;

import com.hospital.entity.Appointment;
import com.hospital.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    long countByAppointmentDate(String appointmentDate);
    long countByAppointmentDateAndStatusNot(String appointmentDate, AppointmentStatus status);
    boolean existsByDoctor_IdAndAppointmentDateAndAppointmentTimeAndStatusNot(Long doctorId, String appointmentDate, String appointmentTime, AppointmentStatus status);
    boolean existsByDoctor_IdAndAppointmentDateAndAppointmentTimeAndStatusNotAndIdNot(Long doctorId, String appointmentDate, String appointmentTime, AppointmentStatus status, Long id);
    List<Appointment> findByDoctor_Id(Long doctorId);
    boolean existsByDoctor_IdAndPatient_Id(Long doctorId, Long patientId);
}
