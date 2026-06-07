package com.library.exception;


 // Thrown when a book is already issued.
public class BookAlreadyIssuedException extends Exception {

    public BookAlreadyIssuedException(String message) {
        super(message);
    }
}