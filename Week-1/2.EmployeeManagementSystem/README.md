# Employee Management System  
Week 1 — Assignment 2: Collections, Custom Exceptions, Optional & Streams  

A console-based Employee Management System built in Java that demonstrates Collections Framework, custom exception handling, Java 8 Optional, and Stream API.

## 📌 About
This application helps manage employee records using a menu-driven console system. It supports adding, viewing, searching, deleting, and filtering employees with proper validations and Java 8 features.

## 🚀 Features

- Add Employee (with duplicate ID check)
- View All Employees
- Search Employee by ID (Optional usage)
- Delete Employee (Custom Exception handling)
- Filter Employees by Department
- Sort Employees by Name and Salary
- Salary Statistics (min, max, average)
- Stream API based operations
- Input validation (basic checks)

---

## 🧠 Concepts Used

### 1. Collections Framework
- `ArrayList` used to store employee records
- Efficient data handling and iteration

### 2. Custom Exceptions
- `EmployeeNotFoundException`
- `DuplicateEmployeeException`
- `InvalidInputException`
- Used for proper error handling and validation

### 3. Java 8 Optional
- Used for safe search operations
- Avoids null pointer issues

### 4. Stream API
- Filtering employees
- Sorting (name, salary)
- Aggregations (min, max, average salary)
- Department-based grouping

---

## 📁 Project Structure
com.employee
│
├── model
│   └── Employee.java
│
├── exception
│   └── EmployeeNotFoundException.java
│
├── service
│   └── EmployeeService.java
│
└── Main.java

## ⚙️ How to Run

1. Open project in Eclipse / IntelliJ / VS Code  
2. Navigate to `Main.java`  
3. Run as Java Application  
4. Use console menu to perform operations  

## 🖥️ Sample Output
===== Employee Management System =====
1. Add Employee
2. View Employees
3. Search Employee
4. Delete Employee
5. Filter By Department
6. Exit

## 🛠️ Technologies Used

- Java 8+
- Collections Framework
- Stream API
- Optional Class
- Exception Handling
- OOP Concepts

## 👤 Author
Vaishnavi Atole
