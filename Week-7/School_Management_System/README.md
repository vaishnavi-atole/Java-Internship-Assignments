# Student Management System

A full-stack College Student Management System built from scratch with a Spring Boot backend and an Angular frontend.

## Project Overview

This repository contains:

- `backend/` - Spring Boot 3.x, Java 21, Spring Security, JWT, Spring Data JPA, Hibernate, MySQL, Lombok, Bean Validation
- `frontend/` - Angular 20 standalone application with Angular Material, reactive forms, JWT authentication, route guards, and HTTP interceptors

The system supports:

- Administrator, teacher, and student login
- JWT-based authentication
- Role-based access control for `ADMIN`, `TEACHER`, and `STUDENT`
- Admin-managed student accounts and records
- Teacher-managed attendance
- Student-only access to their own details and attendance
- Search, pagination, and sorting
- Dashboard statistics and recent student widgets
- Responsive ERP-style UI

## Folder Structure

```text
Student_Management_System/
├── backend/
│   └── src/main/java/com/studentmanagement/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── entity/
│       ├── dto/
│       ├── security/
│       ├── config/
│       ├── exception/
│       ├── util/
│       └── mapper/
└── frontend/
    └── src/app/
        ├── components/
        ├── pages/
        ├── layout/
        ├── services/
        ├── guards/
        ├── interceptors/
        ├── models/
        └── shared/
```

## Installation Steps

### Prerequisites

- Java 21
- Maven 3.9+
- Node.js 20+
- Angular CLI 20
- MySQL 8+

## Backend Setup

1. Open a terminal in `backend/`.
2. Set `DB_USERNAME` and `DB_PASSWORD`, or update their defaults in `src/main/resources/application.yml`.
3. Make sure the database `student_management` exists, or allow MySQL to create it.
4. Run the backend:

```bash
mvn spring-boot:run
```

The backend runs on `http://localhost:8080`.

## Frontend Setup

1. Open a terminal in `frontend/`.
2. Install dependencies:

```bash
npm install
```

3. Start the Angular app:

```bash
npm start
```

The frontend runs on `http://localhost:4200`.

## Database Setup

The SQL schema is available at:

- `backend/src/main/resources/schema.sql`

Database name:

- `student_management`

Tables:

- `users`
- `students`
- `attendance`

## Roles and first login

- `ADMIN` creates teacher accounts and student records. Creating a student also creates the student's login account.
- `TEACHER` can view students and mark or update attendance.
- `STUDENT` can view only their own student record and attendance.

On the first backend startup, a development admin is created when no admin exists:

- Email: `admin@college.com`
- Password: `Admin@123`

Override these with `APP_ADMIN_EMAIL`, `APP_ADMIN_PASSWORD`, and `APP_ADMIN_NAME`. Change the defaults before deploying.

## API Endpoints

### Authentication

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/admin/teachers` - ADMIN only

### Students

- `GET /api/students`
- `GET /api/students/{id}`
- `GET /api/students/me` - STUDENT only
- `POST /api/students` - ADMIN only
- `PUT /api/students/{id}` - ADMIN only
- `DELETE /api/students/{id}` - ADMIN only

### Attendance

- `GET /api/attendance/students/{studentId}` - ADMIN or TEACHER
- `PUT /api/attendance/students/{studentId}` - TEACHER only
- `GET /api/attendance/me` - STUDENT only

### Dashboard

- `GET /api/dashboard/stats`

## Screenshots Placeholder

Add your screenshots here after running the application:

- Login page
- Register page
- Dashboard
- Student list
- Add student form
- Edit student form
- Student details page
- Profile page

## Notes

- JWT is stored in browser local storage.
- The Angular interceptor automatically attaches the token to API requests.
- Expired or invalid tokens are cleared and the user is redirected to login.
- Public registration is disabled; accounts are provisioned by an administrator.
- The backend enforces ownership for student self-service endpoints.
