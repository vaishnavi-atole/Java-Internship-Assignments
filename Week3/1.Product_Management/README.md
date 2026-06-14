# Product Management System

## Overview

A Spring Boot REST API application for managing products. The application performs CRUD (Create, Read, Update, Delete) operations using Spring Data JPA and MySQL.

## Technologies Used

- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- Maven
- Lombok

## Features

- Add Product
- Get All Products
- Get Product By ID
- Update Product
- Delete Product

## Project Structure

``` text
com.product

├── controller

├── model

├── repository

├── service

├──exception

└── ProductManagementApplication
```


## Sample Request

```json
{
  "name": "Laptop",
  "category": "Electronics",
  "price": 55000,
  "quantity": 10
}
```

## How to Run

1. Clone the repository.
2. Open the project in Eclipse IDE.
3. Configure the database connection in application.properties.
4. Run ProductManagementApplication.java.
5. Test APIs using Postman.

## Author

Vaishnavi Atole
