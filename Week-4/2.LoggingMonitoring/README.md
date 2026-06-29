# Employee Management Logging & Monitoring

## Project Overview

This project demonstrates Logging and Monitoring in Spring Boot using SLF4J and Logback. The application provides Employee CRUD operations with centralized logging, audit logging, and global exception handling.

## Features

* Employee CRUD Operations
* Centralized Logging
* SLF4J Integration
* Logback Configuration
* Audit Logging for API Requests
* Global Exception Handling
* MySQL Database Integration
* Log File Generation

## Technologies Used

* Java 17
* Spring Boot
* Spring Data JPA
* MySQL
* Lombok
* Maven
* SLF4J
* Logback

## Project Structure

```text
src/main/java/com.logging

├── controller
│   └── EmployeeController.java
│
├── entity
│   ├── Employee.java
│   └── AuditLog.java
│
├── exception
│   ├── ResourceNotFoundException.java
│   └── GlobalExceptionHandler.java
│
├── repository
│   ├── EmployeeRepository.java
│   └── AuditLogRepository.java
│
├── service
│   ├── EmployeeService.java
│   └── AuditLogService.java
│
└── EmployeeManagementLoggingApplication.java
```

## Running the Application

### Create Database

```sql
CREATE DATABASE logging_db;
```

### Run Application

```bash
mvn spring-boot:run
```

or run the main class:

```text
EmployeeManagementLoggingApplication.java
```

## API Endpoints

### Create Employee

POST

```text
/employees
```

Request Body:

```json
{
  "name": "john",
  "email": "john@gmail.com",
  "department": "Java"
}
```

### Get All Employees

GET

```text
/employees
```

### Get Employee By Id

GET

```text
/employees/{id}
```

### Update Employee

PUT

```text
/employees/{id}
```

### Delete Employee

DELETE

```text
/employees/{id}
```

## Logging Configuration

Logs are generated in:

```text
logs/application.log
```

## Monitoring Implementation

* API Request Logging
* Service Layer Logging
* Exception Logging
* Audit Log Tracking
* Centralized Log Management

## Exception Handling

Global exception handling is implemented using:

```text
GlobalExceptionHandler.java
```

Handled Exceptions:

* ResourceNotFoundException
* Generic Exception

## Author

Vaishnavi Rajaram Atole

