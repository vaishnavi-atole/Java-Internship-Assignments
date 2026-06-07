package com.library.service_impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.library.exception.BookAlreadyIssuedException;
import com.library.exception.BookNotFoundException;
import com.library.exception.UserNotFoundException;
import com.library.model.Book;
import com.library.model.User;
import com.library.service.LibraryService;

//Implementation of LibraryService
public class LibraryServiceImpl implements LibraryService {

	// Stores all books
	private final List<Book> books = new ArrayList<>();

	// Stores users using userId as key
	private final Map<Integer, User> users = new HashMap<>();

	// Add a new book to library
	@Override
	public void addBook(Book book) {
		books.add(book);
		System.out.println("Book added successfully.");
	}

	// Add a new user
	@Override
	public void addUser(User user) {
		users.put(user.getUserId(), user);
		System.out.println("User added successfully.");
	}

	@Override
	public void issueBook(int bookId, int userId)
			throws BookNotFoundException, UserNotFoundException, BookAlreadyIssuedException {

		// Check if user exists
		if (!users.containsKey(userId)) {
			throw new UserNotFoundException("User not found with ID: " + userId);
		}

		// Find book using Stream API
		Book book = books.stream().filter(b -> b.getBookId() == bookId).findFirst()
				.orElseThrow(() -> new BookNotFoundException("Book not found with ID: " + bookId));

		// Check if already issued
		if (book.isIssued()) {
			throw new BookAlreadyIssuedException("Book is already issued.");
		}

		book.setIssued(true);

		System.out.println("Book issued successfully.");
	}

	@Override
	public void returnBook(int bookId) throws BookNotFoundException {

		// Find book using Stream API
		Book book = books.stream().filter(b -> b.getBookId() == bookId).findFirst()
				.orElseThrow(() -> new BookNotFoundException("Book not found with ID: " + bookId));

		// Check if book is already available
		if (!book.isIssued()) {
			System.out.println("Book is already available.");
			return;
		}

		// Mark book as available
		book.setIssued(false);
		System.out.println("Book returned successfully.");
	}

	@Override
	public void displayAllBooks() {

		if (books.isEmpty()) {
			System.out.println("No books available.");
			return;
		}

		books.forEach(System.out::println);
	}

	@Override
	public void searchBook(String keyword) {

		// Search books by title
		List<Book> result = books.stream().filter(book -> book.getTitle().toLowerCase().contains(keyword.toLowerCase()))
				.toList();

		if (result.isEmpty()) {
			System.out.println("No matching books found.");
			return;
		}

		result.forEach(System.out::println);
	}

	@Override
	public void displayAvailableBooks() {

		// Display only available books
		books.stream().filter(book -> !book.isIssued()).forEach(System.out::println);
	}

	@Override
	public void displayIssuedBooks() {

		// Display only issued books
		books.stream().filter(Book::isIssued).forEach(System.out::println);
	}
}
