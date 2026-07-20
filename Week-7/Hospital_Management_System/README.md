# Hospital Management System

A full-stack hospital operations platform for managing patients, clinicians, departments, appointments, prescriptions, billing, and role-based workflows. The application uses JWT authentication and separates access for administrators, doctors, and receptionists.

## Features

- JWT authentication and role-based login
- Admin, Doctor, and Receptionist dashboards
- Patient, doctor, department, appointment, prescription, and billing management
- Doctor availability, appointment completion, and patient-specific prescriptions
- Receptionist patient registration, appointment booking, patient search, billing, and payment status updates
- Dashboard analytics, reports, global search, responsive Angular Material UI, and doctor image upload
- Role-based authorization at route and API level
- Admission management is reserved for a future module; it is not implemented in the current backend
- Pagination is not currently exposed by the REST APIs

## Technology Stack

### Frontend

- Angular 20, TypeScript, RxJS
- Bootstrap 5 and Angular Material
- Chart.js / ng2-charts

### Backend

- Java 21, Spring Boot 3, Maven
- Spring Security, JWT, Spring Data JPA, Hibernate

### Database

- MySQL

## Project Structure

```text
Hospital_Management/
├── backend/                 # Spring Boot REST API
│   ├── src/main/java/com/hospital/
│   │   ├── config/ controller/ dto/ entity/ repository/
│   │   ├── security/ service/ service/impl/ exception/
│   │   └── util/ response/ enums/
│   ├── src/main/resources/application.properties
│   └── pom.xml
├── frontend/                # Angular 20 application
│   ├── src/app/
│   │   ├── core/ features/ services/ shared/ models/
│   │   └── app.config.ts, app.routes.ts
│   └── package.json
├── API_COLLECTION.md
├── DATABASE_SCHEMA.md
└── PROJECT_STRUCTURE.md
```

## Installation Guide

### MySQL Configuration

Create a MySQL server instance. The default configuration creates or uses the `hospital_management` database. Set optional environment variables before starting the backend:

### Backend Setup and Run

```bash
cd backend
./mvnw spring-boot:run
```

Alternatively, use Maven with Java 21:

```bash
mvn spring-boot:run
```

The API starts at `http://localhost:8080`.

### Frontend Setup and Run

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:4200`.

## Default Login Credentials

Default seed credentials can vary when the database already contains users. For a fresh seeded database, use the values configured by the backend seed data.

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@hospital.com` | `Admin@123` |

## Swagger API

`http://localhost:8080/swagger-ui/index.html`

## Future Enhancements

- Laboratory module
- Pharmacy module
- SMS and email notifications
- Online appointment booking
- Inventory management
- Admissions and discharge workflow
- PDF report export and server-side pagination

## Author

**Vaishnavi Rajaram Atole**
