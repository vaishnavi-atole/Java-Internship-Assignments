package com.hospital.config;

import com.hospital.entity.Department;
import com.hospital.entity.Role;
import com.hospital.entity.User;
import com.hospital.repository.DepartmentRepository;
import com.hospital.repository.RoleRepository;
import com.hospital.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(null, "ADMIN", "Administrator"));
            roleRepository.save(new Role(null, "DOCTOR", "Doctor"));
            roleRepository.save(new Role(null, "RECEPTIONIST", "Receptionist"));
        }
        if (userRepository.findByUsername("admin").isEmpty()) {
            Role adminRole = roleRepository.findByName("ADMIN").orElseThrow();
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@hospital.com");
            admin.setFirstName("System");
            admin.setLastName("Administrator");
            admin.setRole(adminRole);
            admin.setEnabled(true);
            userRepository.save(admin);
        }
        if (departmentRepository.count() == 0) {
            departmentRepository.save(new Department(null, "Cardiology", "Heart and vascular services", "Dr. James", true));
            departmentRepository.save(new Department(null, "Neurology", "Brain and nervous system", "Dr. Ada", true));
            departmentRepository.save(new Department(null, "Orthopedics", "Bone and joint care", "Dr. Leo", true));
        }
    }
}
