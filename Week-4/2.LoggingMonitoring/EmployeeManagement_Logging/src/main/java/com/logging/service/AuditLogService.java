package com.logging.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.logging.entity.AuditLog;
import com.logging.repository.AuditLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public void saveAuditLog(
            String action,
            String endpoint) {

        AuditLog log = new AuditLog();

        log.setAction(action);
        log.setEndpoint(endpoint);
        log.setTimestamp(
                LocalDateTime.now());

        auditLogRepository.save(log);
    }
}
