# Multithreading File Processor

## Overview

This project demonstrates Multithreading and File Handling in Java. Multiple files are processed simultaneously using separate threads. The application reads text from input files, converts the content to uppercase, writes the processed content to output files, and logs processing details.

## Features

* Multithreaded file processing
* Read files using BufferedReader
* Write files using BufferedWriter
* Process multiple files concurrently
* Maintain processing logs
* Clean and modular code structure

## Technologies Used

* Java
* Multithreading (Thread, Runnable)
* File Handling
* BufferedReader
* BufferedWriter

## Project Structure

Multithreading_File_Processor

├── src

│ └── com.fileprocessor

│ ├── Main.java

│ ├── FileProcessor.java

│ └── ProcessingLogger.java

├── input

│ ├── file1.txt

│ └── file2.txt

├── output

├── logs

│ └── processing.log

└── README.md

## How to Run

1. Clone the repository.
2. Open the project in Eclipse or any Java IDE.
3. Create the following folders:

   * input
   * output
   * logs
4. Add text files inside the input folder.
5. Run Main.java.
6. Processed files will be generated in the output folder.
7. Processing details will be stored in logs/processing.log.

## Sample Input

file1.txt

Hello Java

Multithreading Assignment

## Sample Output

HELLO JAVA

MULTITHREADING ASSIGNMENT

## Learning Outcomes

* Understanding Java Threads
* Implementing Runnable Interface
* Reading and Writing Files
* Synchronization using synchronized keyword
* Exception Handling
* Clean Code Practices

