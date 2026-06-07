package com.library.model;

//Represent book in the library
public class Book {

	// Unique identifier for a book
	private int bookId;

	private String title;

	private String author;

	private boolean issued;

	// Constructor to initialize book details
	public Book(int bookId, String title, String author) {
		this.bookId = bookId;
		this.title = title;
		this.author = author;
		this.issued = false;
	}

	// return book id
	public int getBookId() {
		return bookId;
	}

	// return book title
	public String getTitle() {
		return title;
	}

	// return author name
	public String getAuthor() {
		return author;
	}

	// check issue status
	public boolean isIssued() {
		return issued;
	}

	// update issue status
	public void setIssued(boolean issued) {
		this.issued = issued;
	}

	@Override
	public String toString() {
		return "Book ID : " + bookId + "\nTitle   : " + title + "\nAuthor  : " + author + "\nIssued  : " + issued;
	}
}
