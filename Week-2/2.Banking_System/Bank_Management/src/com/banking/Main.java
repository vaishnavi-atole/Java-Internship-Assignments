package com.banking;

import java.util.Scanner;

import com.banking.dao.CustomerDAO;
import com.banking.model.Customer;

// Entry point of the Banking System application.

public class Main {

	public static void main(String[] args) {

		Scanner scanner = new Scanner(System.in);

		CustomerDAO customerDAO = new CustomerDAO();

		int choice;

		do {

			System.out.println("\n===== BANKING SYSTEM =====");

			System.out.println("1. Create Account");

			System.out.println("2. View Accounts");

			System.out.println("3. Update Balance");

			System.out.println("4. Delete Account");

			System.out.println("5. Exit");

			System.out.print("Enter Choice: ");

			choice = scanner.nextInt();

			switch (choice) {

			case 1:

			    scanner.nextLine();

			    System.out.print("Enter Name: ");
			    String name = scanner.nextLine();

			    System.out.print("Enter Account Number: ");
			    String accountNumber = scanner.nextLine();

			    System.out.print("Enter Balance: ");
			    double balance = scanner.nextDouble();

			    Customer customer =
			            new Customer(name, accountNumber, balance);

			    customerDAO.addCustomer(customer);

			    break;

			case 2:

			    customerDAO.viewCustomers();

			    break;

			case 3:

			    scanner.nextLine();

			    System.out.print("Enter Account Number: ");
			    String updateAccount = scanner.nextLine();

			    System.out.print("Enter New Balance: ");
			    double newBalance = scanner.nextDouble();

			    customerDAO.updateBalance(
			            updateAccount,
			            newBalance);

			    break;

			case 4:

			    scanner.nextLine();

			    System.out.print("Enter Account Number: ");
			    String deleteAccount = scanner.nextLine();

			    customerDAO.deleteCustomer(deleteAccount);

			    break;

			case 5:

			    System.out.println("Thank You!");
			    break;

			default:

			    System.out.println("Invalid Choice!");
			}

		} while (choice != 5);

		scanner.close();
	}
}
