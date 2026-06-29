package com.logging.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.logging.entity.Employee;
import com.logging.exception.ResourceNotFoundException;
import com.logging.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private static final Logger logger =
            LoggerFactory.getLogger(EmployeeService.class);

    private final EmployeeRepository employeeRepository;

    // Save Employee
    public Employee addEmployee(Employee employee) {

        logger.info("Saving employee: {}", employee.getName());

        return employeeRepository.save(employee);
    }

    // Get All Employees
    public List<Employee> getAllEmployees() {

        logger.info("Fetching all employees");

        return employeeRepository.findAll();
    }

    // Get Employee By Id
    public Employee getEmployeeById(Long id) {

        logger.info("Fetching employee with id: {}", id);

        return employeeRepository.findById(id)
                .orElseThrow(() -> {

                    logger.error(
                            "Employee not found with id: {}",
                            id);

                    return new ResourceNotFoundException(
                            "Employee not found with id: "
                                    + id);
                });
    }

    // Update Employee
    public Employee updateEmployee(
            Long id,
            Employee updatedEmployee) {

        logger.info(
                "Updating employee with id: {}",
                id);

        Employee employee =
                getEmployeeById(id);

        employee.setName(
                updatedEmployee.getName());

        employee.setEmail(
                updatedEmployee.getEmail());

        employee.setDepartment(
                updatedEmployee.getDepartment());

        return employeeRepository.save(
                employee);
    }

    // Delete Employee
    public void deleteEmployee(Long id) {

        logger.info(
                "Deleting employee with id: {}",
                id);

        Employee employee =
                getEmployeeById(id);

        employeeRepository.delete(employee);
    }
}