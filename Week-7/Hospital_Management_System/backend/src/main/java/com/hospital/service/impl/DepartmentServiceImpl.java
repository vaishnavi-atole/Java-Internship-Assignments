package com.hospital.service.impl;

import com.hospital.dto.DepartmentRequest;
import com.hospital.dto.DepartmentResponse;
import com.hospital.entity.Department;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.DepartmentRepository;
import com.hospital.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    @Override
    public DepartmentResponse create(DepartmentRequest request) {
        Department department = modelMapper.map(request, Department.class);
        return modelMapper.map(departmentRepository.save(department), DepartmentResponse.class);
    }

    @Override
    public DepartmentResponse update(Long id, DepartmentRequest request) {
        Department department = departmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        department.setName(request.getName());
        department.setDescription(request.getDescription());
        department.setDepartmentHead(request.getDepartmentHead());
        department.setActive(request.isActive());
        return modelMapper.map(departmentRepository.save(department), DepartmentResponse.class);
    }

    @Override
    public DepartmentResponse findById(Long id) {
        return departmentRepository.findById(id).map(dept -> modelMapper.map(dept, DepartmentResponse.class)).orElseThrow(() -> new ResourceNotFoundException("Department not found"));
    }

    @Override
    public List<DepartmentResponse> findAll() {
        return departmentRepository.findAll().stream().map(dept -> modelMapper.map(dept, DepartmentResponse.class)).toList();
    }

    @Override
    public void delete(Long id) {
        Department department = departmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        departmentRepository.delete(department);
    }
}
