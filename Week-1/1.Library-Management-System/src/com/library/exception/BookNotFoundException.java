package com.library.exception;


// Thrown when a book cannot be found in the library.
 
public class BookNotFoundException extends Exception {

    public BookNotFoundException(String message) {
        super(message);
    }
}