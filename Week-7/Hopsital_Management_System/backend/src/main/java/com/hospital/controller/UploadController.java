package com.hospital.controller;

import com.hospital.response.ApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/uploads")
public class UploadController {
    private static final Map<String, String> EXTENSIONS = Map.of(
        "image/jpeg", "jpg",
        "image/png", "png",
        "image/webp", "webp"
    );

    @Value("${app.upload.dir:uploads}")
    private String uploadDirectory;

    @PostMapping("/doctor-photo")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadDoctorPhoto(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty() || !EXTENSIONS.containsKey(file.getContentType())) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Upload a JPG, PNG, or WEBP image", null, Instant.now()));
        }

        try {
            Path doctorsDirectory = Path.of(uploadDirectory, "doctors").toAbsolutePath().normalize();
            Files.createDirectories(doctorsDirectory);
            String filename = UUID.randomUUID() + "." + EXTENSIONS.get(file.getContentType());
            Files.copy(file.getInputStream(), doctorsDirectory.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
            String url = "/uploads/doctors/" + filename;
            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Photo uploaded", Map.of("url", url), Instant.now()));
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(false, "Unable to save photo", null, Instant.now()));
        }
    }
}
