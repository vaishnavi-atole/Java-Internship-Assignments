package com.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.security.filter.JwtAuthFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    /**
     * Password Encoder Bean
     * Used to encrypt passwords before storing in DB.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Authentication Manager Bean
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    /**
     * Security Configuration
     */
    @Bean
    public SecurityFilterChain securityFilterChain(
            org.springframework.security.config.annotation.web.builders.HttpSecurity http)
            throws Exception {

        http

                // Disable CSRF for REST APIs
                .csrf(csrf -> csrf.disable())

                // JWT uses Stateless Session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS))

                // Endpoint Authorization
                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                		.requestMatchers(
                		        "/auth/register",
                		        "/auth/login",
                		        "/swagger-ui/**",
                		        "/swagger-ui.html",
                		        "/v3/api-docs/**")
                		
                        .permitAll()

                        // Admin APIs
                        .requestMatchers("/admin/**")
                        .hasRole("ADMIN")

                        // User APIs
                        .requestMatchers("/user/**")
                        .hasAnyRole("USER", "ADMIN")

                        // All other APIs require authentication
                        .anyRequest()
                        .authenticated())

                // Add JWT Filter before UsernamePasswordAuthenticationFilter
                .addFilterBefore(
                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
