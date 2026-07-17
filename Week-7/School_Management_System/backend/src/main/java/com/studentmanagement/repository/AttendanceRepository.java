package com.studentmanagement.repository;

import com.studentmanagement.entity.Attendance;
import com.studentmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);
    List<Attendance> findByStudentIdOrderByDateDesc(Long studentId);
    void deleteByStudentId(Long studentId);

    @Modifying
    @Query("update Attendance a set a.markedBy = :replacement where a.markedBy.id = :teacherId")
    void reassignMarkedBy(Long teacherId, User replacement);
}
