package com.studentmanagement.config;

import com.studentmanagement.entity.Role;
import com.studentmanagement.entity.User;
import com.studentmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminBootstrapConfig {
    @Bean
    CommandLineRunner createInitialAdmin(UserRepository userRepository,
                                         PasswordEncoder passwordEncoder,
                                         @Value("${app.bootstrap-admin.enabled:true}") boolean enabled,
                                         @Value("${app.bootstrap-admin.name:System Administrator}") String name,
                                         @Value("${app.bootstrap-admin.email:admin@college.com}") String email,
                                         @Value("${app.bootstrap-admin.password:Admin@123}") String password) {
        return args -> {
            if (enabled && !userRepository.existsByRole(Role.ADMIN)) {
                userRepository.save(User.builder()
                        .name(name)
                        .email(email)
                        .password(passwordEncoder.encode(password))
                        .role(Role.ADMIN)
                        .build());
            }
        };
    }
}
