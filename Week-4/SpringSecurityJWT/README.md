# Spring Security JWT Authentication

## Project Overview

This project demonstrates JWT (JSON Web Token) based Authentication and Authorization using Spring Boot and Spring Security.

The application provides secure REST APIs with role-based access control for USER and ADMIN roles.

---

## Features

- User Registration
- User Login Authentication
- JWT Token Generation
- JWT Token Validation
- Spring Security Integration
- Role-Based Authorization
- Password Encryption using BCrypt
- Global Exception Handling
- MySQL Database Integration
- Swagger UI Support

---

## Technologies Used

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT (JSON Web Token)
- MySQL
- Lombok
- Maven
- Swagger UI

---

## Project Structure

```text
src/main/java/com/security

├── config
│   └── SecurityConfig.java
│
├── controller
│   ├── AuthController.java
│   └── UserController.java
│
├── dto
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   └── JwtResponse.java
│
├── entity
│   ├── User.java
│   └── Role.java
│
├── exception
│   ├── CustomException.java
│   └── GlobalExceptionHandler.java
│
├── filter
│   └── JwtAuthFilter.java
│
├── repository
│   └── UserRepository.java
│
├── securityjwt
│   └── JwtUtil.java
│
├── service
│   ├── AuthService.java
│   └── UserDetailsServiceImpl.java
│
└── SecurityJwtApplication.java
```
---

## Running the Application

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project

```bash
cd Security_JWT
```

### Run Application

```bash
mvn spring-boot:run
```

or run the main class:

```text
SecurityJwtApplication.java
```

---

## API Endpoints

### Register User

**POST**

```http
/auth/register
```

Request Body:

```json
{
  "username": "vaishnavi",
  "password": "12345",
  "role": "ROLE_USER"
}
```

---

### Register Admin

**POST**

```http
/auth/register
```

Request Body:

```json
{
  "username": "admin",
  "password": "admin123",
  "role": "ROLE_ADMIN"
}
```

---

### Login

**POST**

```http
/auth/login
```

Request Body:

```json
{
  "username": "vaishnavi",
  "password": "12345"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Protected APIs

### User Endpoint

```http
GET /user/profile
```

Accessible by:

- ROLE_USER
- ROLE_ADMIN

---

### Admin Endpoint

```http
GET /admin/dashboard
```

Accessible by:

- ROLE_ADMIN only

---

## Swagger UI

Open Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

---

## Security Implementation

- JWT Authentication
- JWT Authorization
- BCrypt Password Encryption
- Stateless Session Management
- Role-Based Access Control
- Secure REST Endpoints

---

## Exception Handling

Global exception handling is implemented using:

```text
GlobalExceptionHandler.java
```

Custom exceptions are handled centrally and return meaningful error responses.

---

## Author

Vaishnavi Atole
