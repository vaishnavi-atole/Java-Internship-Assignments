package com.library.exception;


 // Thrown when a user cannot be found.
public class UserNotFoundException extends Exception {

    public UserNotFoundException(String message) {
        super(message);
    }
}