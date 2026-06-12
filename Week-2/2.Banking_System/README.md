# Bank Management System

## Project Description

The Bank Management System is a console-based Java application developed using JDBC and MySQL. It allows users to manage customer accounts by performing basic banking operations such as adding customers, viewing customer details, updating account balances, and deleting customer records.

## Technologies Used

* Java 17
* JDBC (Java Database Connectivity)
* MySQL Database
* Eclipse IDE

## Features

* Create Customer Account
* View All Customer Accounts
* Update Customer Balance
* Delete Customer Account
* Database Connectivity using JDBC
* Menu-Driven Console Application

## Database Schema

```sql
CREATE DATABASE banking_system;

USE banking_system;

CREATE TABLE customer (
    account_number VARCHAR(20) PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    balance DECIMAL(12,2) NOT NULL
);
```

## Project Structure

```text
src/
├── com.banking.conn
│   └── DBConnection.java
│
├── com.banking.dao
│   └── CustomerDAO.java
│
├── com.banking.model
│   └── Customer.java
│
└── com.banking
    └── Main.java
```

## Operations Available

1. Add Customer
2. View Customers
3. Update Balance
4. Delete Customer
5. Exit

## Learning Outcomes

* Understanding JDBC Architecture
* Database Connectivity in Java
* CRUD Operations using PreparedStatement
* Exception Handling
* Layered Project Structure (Model, DAO, Connection)

## Author

Vaishnavi Atole

