package com.library;

import java.util.Scanner;

import com.library.exception.BookAlreadyIssuedException;
import com.library.exception.BookNotFoundException;
import com.library.exception.UserNotFoundException;
import com.library.model.Book;
import com.library.model.User;
import com.library.service.LibraryService;
import com.library.service_impl.LibraryServiceImpl;

public class Main {

	public static void main(String[] args) {

		// Create scanner for user input
		Scanner scanner = new Scanner(System.in);

		// Create service object
		LibraryService libraryService = new LibraryServiceImpl();

		// Sample data for testing
		libraryService.addUser(new User(101, "Vaishnavi"));
		libraryService.addUser(new User(102, "Rahul"));

		libraryService.addBook(new Book(1, "Java Basics", "James Gosling"));
		libraryService.addBook(new Book(2, "Spring Boot", "Craig Walls"));

		// Display menu until user exits
		while (true) {

			System.out.println("\n=================================");
			System.out.println(" LIBRARY MANAGEMENT SYSTEM ");
			System.out.println("=================================");
			System.out.println("1. Add Book");
			System.out.println("2. Add User");
			System.out.println("3. Issue Book");
			System.out.println("4. Return Book");
			System.out.println("5. Display All Books");
			System.out.println("6. Search Book");
			System.out.println("7. Display Available Books");
			System.out.println("8. Display Issued Books");
			System.out.println("9. Exit");
			System.out.print("Enter your choice: ");

			int choice = scanner.nextInt();
			scanner.nextLine();

			try {

				switch (choice) {

				case 1:// Add new book

					System.out.print("Enter Book ID: ");
					int bookId = scanner.nextInt();
					scanner.nextLine();

					System.out.print("Enter Book Title: ");
					String title = scanner.nextLine();

					System.out.print("Enter Author Name: ");
					String author = scanner.nextLine();

					libraryService.addBook(new Book(bookId, title, author));
					break;

				case 2:// Add new user

					System.out.print("Enter User ID: ");
					int userId = scanner.nextInt();
					scanner.nextLine();

					System.out.print("Enter User Name: ");
					String userName = scanner.nextLine();

					libraryService.addUser(new User(userId, userName));
					break;

				case 3:// Issue a book

					System.out.print("Enter Book ID: ");
					int issueBookId = scanner.nextInt();

					System.out.print("Enter User ID: ");
					int issueUserId = scanner.nextInt();

					libraryService.issueBook(issueBookId, issueUserId);
					break;

				case 4:// Return a book

					System.out.print("Enter Book ID: ");
					int returnBookId = scanner.nextInt();

					libraryService.returnBook(returnBookId);
					break;

				case 5:

					libraryService.displayAllBooks();
					break;

				case 6:// Search book by title

					System.out.print("Enter title keyword: ");
					String keyword = scanner.nextLine();

					libraryService.searchBook(keyword);
					break;

				case 7:

					libraryService.displayAvailableBooks();
					break;

				case 8:

					libraryService.displayIssuedBooks();
					break;

				case 9:// Exit application

					System.out.println("Exiting application...");
					scanner.close();
					System.exit(0);

				default:

					System.out.println("Invalid choice.");
				}

			} catch (BookNotFoundException | UserNotFoundException | BookAlreadyIssuedException e) {

				System.out.println("Error: " + e.getMessage());
			}
		}
	}
}