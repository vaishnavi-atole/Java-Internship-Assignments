# School Management System

A full-stack School Management System built using Spring Boot and Angular to streamline student, teacher, attendance, and administrative management.

## Project Overview

This repository contains:

* `backend/` - Spring Boot, Spring Security, JWT Authentication, Spring Data JPA, Hibernate, MySQL, Maven
* `frontend/` - Angular application with reactive forms, route guards, HTTP interceptors, and responsive UI

The system supports:

* Administrator login and management
* Teacher management
* Student management
* Attendance tracking
* JWT-based authentication
* Role-based authorization
* Search, pagination, and sorting
* Dashboard and reporting features
* Responsive user interface

## Folder Structure

```text
School_Management_System/
├── backend/
│   └── src/main/java/com/example/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── entity/
│       ├── dto/
│       ├── config/
│       ├── security/
│       ├── exception/
│       └── util/
│
└── frontend/
    └── src/app/
        ├── components/
        ├── services/
        ├── guards/
        ├── interceptors/
        ├── models/
        └── pages/
```

## Technologies Used

### Backend

* Java 17+
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL
* Maven
* Lombok

### Frontend

* Angular
* TypeScript
* HTML
* CSS
* Bootstrap

## Prerequisites

Before running the project, ensure the following software is installed:

* Java 17 or later
* Maven
* MySQL Server
* Node.js
* Angular CLI

## Backend Setup

1. Navigate to the backend folder.
2. Create a MySQL database.
3. Configure database credentials in `application.properties`.
4. Run the application:

```bash
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

## Frontend Setup

1. Navigate to the frontend folder.
2. Install dependencies:

```bash
npm install
```

3. Start the Angular application:

```bash
ng serve
```

Frontend URL:

```text
http://localhost:4200
```

## Database Configuration

Database Name:

```text
school_management
```

Update the following properties:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/school_management
spring.datasource.username=root
spring.datasource.password=your_password
```

## User Roles

### ADMIN

* Manage students
* Manage teachers
* View reports
* Monitor attendance

### TEACHER

* View assigned students
* Mark attendance
* Update attendance records

### STUDENT

* View personal profile
* View attendance history

## API Endpoints

### Authentication

* POST `/api/auth/login`
* POST `/api/auth/register`

### Students

* GET `/api/students`
* GET `/api/students/{id}`
* POST `/api/students`
* PUT `/api/students/{id}`
* DELETE `/api/students/{id}`

### Teachers

* GET `/api/teachers`
* POST `/api/teachers`
* PUT `/api/teachers/{id}`
* DELETE `/api/teachers/{id}`

### Attendance

* GET `/api/attendance`
* POST `/api/attendance`
* PUT `/api/attendance/{id}`

## Future Enhancements

* Online Fee Management
* Examination Module
* Email Notifications
* Student Performance Analytics
* Parent Portal
* Report Generation

## Author

**Vaishnavi Rajaram Atole**
