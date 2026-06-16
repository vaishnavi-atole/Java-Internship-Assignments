# Order Management System

## Project Overview

Order Management System is a Spring Boot REST API application that manages customers and their orders. The project demonstrates Spring Boot Core concepts such as Entity Relationships, CRUD Operations, Validation, Pagination, Sorting, and Exception Handling.

---

## Features

### Customer Management

* Create Customer
* Get All Customers
* Get Customer By ID
* Update Customer
* Delete Customer

### Order Management

* Create Order for Customer
* Get All Orders
* Get Order By ID
* Update Order
* Delete Order

### Additional Features

* One-to-Many Relationship (Customer → Orders)
* Validation using Jakarta Validation
* Global Exception Handling
* Pagination
* Sorting
* Swagger API Documentation

---

## Technologies Used

* Java 17
* Spring Boot
* Spring Data JPA
* MySQL
* Lombok
* Maven
* Swagger OpenAPI

---

## Project Structure

```text
src/main/java/com/order

├── controller
│   ├── CustomerController.java
│   └── OrderController.java
│
├── service
│   ├── CustomerService.java
│   └── OrderService.java
│
├── repository
│   ├── CustomerRepository.java
│   └── OrderRepository.java
│
├── entity
│   ├── Customer.java
│   └── OrderEntity.java
│
├── dto
│   ├── CustomerRequestDto.java
│   └── OrderRequestDto.java
│
├── exception
│   ├── ResourceNotFoundException.java
│   └── GlobalExceptionHandler.java
│
└── OrderManagementSystemApplication.java
```

---

## Database Setup

Create a database:

```sql
CREATE DATABASE order_management;
```

Update database configuration in `application.properties`.

---

## Run the Application

1. Clone the repository

```bash
git clone <repository-url>
```

2. Open project in Eclipse

3. Update database configuration

4. Run:

```text
OrderManagementSystemApplication.java
```

5. Application starts on:

```text
http://localhost:8080
```

---

## API Endpoints

### Customer APIs

| Method | Endpoint        |
| ------ | --------------- |
| POST   | /customers      |
| GET    | /customers      |
| GET    | /customers/{id} |
| PUT    | /customers/{id} |
| DELETE | /customers/{id} |

### Order APIs

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | /orders/{customerId} |
| GET    | /orders              |
| GET    | /orders/{id}         |
| PUT    | /orders/{id}         |
| DELETE | /orders/{id}         |

---

## Pagination Example

```
GET /orders?page=0&size=5
```

---

## Sorting Example

```
GET /orders?page=0&size=5&sortBy=price
```

---

## Entity Relationship

* One Customer can have Multiple Orders.
* Each Order belongs to One Customer.

Implemented using:

* `@OneToMany`
* `@ManyToOne`
* `@JoinColumn`

---

## Author

Vaishnavi Atole

