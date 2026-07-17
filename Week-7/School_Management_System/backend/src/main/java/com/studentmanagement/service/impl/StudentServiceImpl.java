package com.studentmanagement.service.impl;

import com.studentmanagement.dto.student.StudentRequest;
import com.studentmanagement.dto.student.StudentResponse;
import com.studentmanagement.entity.Student;
import com.studentmanagement.entity.Role;
import com.studentmanagement.entity.User;
import com.studentmanagement.exception.DuplicateResourceException;
import com.studentmanagement.exception.ResourceNotFoundException;
import com.studentmanagement.mapper.StudentMapper;
import com.studentmanagement.repository.StudentRepository;
import com.studentmanagement.repository.UserRepository;
import com.studentmanagement.repository.AttendanceRepository;
import com.studentmanagement.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AttendanceRepository attendanceRepository;

    @Override
    public StudentResponse createStudent(StudentRequest request) {
        validateUniqueEmail(request.getEmail(), null);
        if (request.getLoginPassword() == null || request.getLoginPassword().isBlank()) {
            throw new IllegalArgumentException("A login password is required when creating a student");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("A user account with this email already exists");
        }
        User user = userRepository.save(User.builder()
                .name(request.getFirstName() + " " + request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getLoginPassword()))
                .role(Role.STUDENT)
                .build());
        Student student = studentMapper.toEntity(request);
        student.setUser(user);
        Student savedStudent = studentRepository.save(student);
        return studentMapper.toResponse(savedStudent);
    }

    @Override
    public StudentResponse updateStudent(Long id, StudentRequest request) {
        Student student = findStudentEntity(id);
        validateUniqueEmail(request.getEmail(), student.getId());
        User user = student.getUser();
        if (user != null && !user.getEmail().equalsIgnoreCase(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("A user account with this email already exists");
        }
        studentMapper.updateEntity(student, request);
        if (user != null) {
            user.setName(request.getFirstName() + " " + request.getLastName());
            user.setEmail(request.getEmail());
            if (request.getLoginPassword() != null && !request.getLoginPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(request.getLoginPassword()));
            }
            userRepository.save(user);
        }
        return studentMapper.toResponse(studentRepository.save(student));
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = findStudentEntity(id);
        attendanceRepository.deleteByStudentId(id);
        studentRepository.delete(student);
        if (student.getUser() != null) {
            userRepository.delete(student.getUser());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public StudentResponse getStudent(Long id) {
        return studentMapper.toResponse(findStudentEntity(id));
    }

    @Override
    @Transactional(readOnly = true)
    public StudentResponse getCurrentStudent() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return studentRepository.findByUserEmail(email)
                .map(studentMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("No student record is linked to this account"));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudentResponse> getStudents(String keyword, Pageable pageable) {
        Page<Student> students = keyword == null || keyword.isBlank()
                ? studentRepository.findAll(pageable)
                : studentRepository.findByStudentIdContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrDepartmentContainingIgnoreCaseOrCourseContainingIgnoreCase(
                        keyword, keyword, keyword, keyword, keyword, keyword, pageable);
        return students.map(studentMapper::toResponse);
    }

    private Student findStudentEntity(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    private void validateUniqueEmail(String email, Long currentId) {
        boolean duplicate = currentId == null
                ? studentRepository.existsByEmail(email)
                : studentRepository.existsByEmailIgnoreCaseAndIdNot(email, currentId);
        if (duplicate) {
            throw new DuplicateResourceException("Student email already exists");
        }
    }
}
