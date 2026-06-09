# Multithreading File Processor

## Description

A Java-based file processing application that demonstrates the use of multithreading and file handling. The application processes multiple text files concurrently using separate threads, transforms file content to uppercase, and records processing activities in a log file.

## Features

* Concurrent processing of multiple files using Java threads
* File reading using `BufferedReader`
* File writing using `BufferedWriter`
* Thread-safe logging mechanism
* Clean and modular code structure
* Exception handling for file operations

## Technologies Used

* Java
* Multithreading (`Thread`, `Runnable`)
* File Handling
* BufferedReader
* BufferedWriter

## Project Structure

```text
Multithreading_File_Processor
│
├── src
│   └── com.fileprocessor
│       ├── Main.java
│       ├── FileProcessor.java
│       └── ProcessingLogger.java
│
├── input
│   ├── file1.txt
│   └── file2.txt
│
├── output
│
├── logs
│
└── README.md
```

## How It Works

1. Input files are placed inside the `input` directory.
2. A separate thread is created for each file.
3. Each thread reads the file content.
4. The content is converted to uppercase.
5. Processed data is written to the corresponding output file.
6. Processing details are stored in `processing.log`.

## Setup Instructions

1. Clone the repository.

```bash
git clone <repository-url>
```

2. Open the project in Eclipse or any Java IDE.

3. Create the following directories if they do not exist:

```text
input
output
logs
```

4. Add text files to the `input` folder.

5. Run `Main.java`.

## Sample Input

```text
Hello Java
Multithreading Assignment
```

## Sample Output

```text
HELLO JAVA
MULTITHREADING ASSIGNMENT
```

## Learning Outcomes

This project demonstrates:

* Java Multithreading
* Runnable Interface
* Thread Management
* File Handling in Java
* Buffered Streams
* Synchronization using `synchronized`
* Clean Code Practices

## Author

Vaishnavi Atole
