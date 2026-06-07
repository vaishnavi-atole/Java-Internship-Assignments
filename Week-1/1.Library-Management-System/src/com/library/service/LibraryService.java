package com.library.service;

import com.library.exception.BookAlreadyIssuedException;
import com.library.exception.BookNotFoundException;
import com.library.exception.UserNotFoundException;
import com.library.model.Book;
import com.library.model.User;

public interface LibraryService {

	void addBook(Book book);

	void addUser(User user);

	void issueBook(int bookId, int userId)
			throws BookNotFoundException, UserNotFoundException, BookAlreadyIssuedException;

	void returnBook(int bookId) throws BookNotFoundException;

	void displayAllBooks();

	void searchBook(String keyword);

	void displayAvailableBooks();

	void displayIssuedBooks();
}