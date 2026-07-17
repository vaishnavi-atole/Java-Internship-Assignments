package com.studentmanagement.repository;

import com.studentmanagement.entity.Gender;
import com.studentmanagement.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByStudentId(String studentId);

    Optional<Student> findByUserEmail(String email);

    boolean existsByStudentId(String studentId);

    boolean existsByEmail(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

    Page<Student> findByStudentIdContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrDepartmentContainingIgnoreCaseOrCourseContainingIgnoreCase(
            String studentId,
            String firstName,
            String lastName,
            String email,
            String department,
            String course,
            Pageable pageable
    );

    long countByGender(Gender gender);

    List<Student> findTop5ByOrderByCreatedAtDesc();

    @Query("select s.department, count(s) from Student s group by s.department order by count(s) desc")
    List<Object[]> countStudentsByDepartment();
}
