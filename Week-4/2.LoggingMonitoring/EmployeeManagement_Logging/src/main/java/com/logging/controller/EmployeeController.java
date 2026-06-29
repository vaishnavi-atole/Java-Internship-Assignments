package com.logging.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.logging.entity.Employee;
import com.logging.service.AuditLogService;
import com.logging.service.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {
	
	

    private static final Logger logger =
            LoggerFactory.getLogger(
                    EmployeeController.class);
    private final AuditLogService auditLogService;

    private final EmployeeService employeeService;

    // Create Employee
    @PostMapping
    public Employee addEmployee(
            @Valid @RequestBody Employee employee) {

        logger.info(
                "API Request: Create Employee");
        
        auditLogService.saveAuditLog(
                "CREATE_EMPLOYEE",
                "/employees");


        return employeeService
                .addEmployee(employee);
    }

    // Get All Employees
    @GetMapping
    public List<Employee> getAllEmployees() {

        logger.info(
                "API Request: Get All Employees");
        auditLogService.saveAuditLog(
                "GET_ALL_EMPLOYEES",
                "/employees");


        return employeeService
                .getAllEmployees();
    }

    // Get Employee By Id
    @GetMapping("/{id}")
    public Employee getEmployeeById(
            @PathVariable Long id) {

        logger.info(
                "API Request: Get Employee By Id");

        auditLogService.saveAuditLog(
                "GET_EMPLOYEE",
                "/employees/" + id);

        return employeeService
                .getEmployeeById(id);
    }

    // Update Employee
    @PutMapping("/{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employee) {

        logger.info(
                "API Request: Update Employee");

        auditLogService.saveAuditLog(
                "UPDATE_EMPLOYEE",
                "/employees/" + id);

        return employeeService
                .updateEmployee(id,
                        employee);
    }

    // Delete Employee
    @DeleteMapping("/{id}")
    public String deleteEmployee(
            @PathVariable Long id) {

        logger.info(
                "API Request: Delete Employee");
        auditLogService.saveAuditLog(
                "DELETE_EMPLOYEE",
                "/employees/" + id);

        employeeService.deleteEmployee(id);

        return "Employee Deleted Successfully";
    }
}
