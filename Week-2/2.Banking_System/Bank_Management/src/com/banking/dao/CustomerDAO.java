package com.banking.dao;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.banking.model.Customer;
import com.banking.conn.DBConnection;

 // DAO class responsible for performing
 //CRUD operations on customer accounts.
 
public class CustomerDAO {

   // Inserts a new customer account into the database
    public void addCustomer(Customer customer) {

        String query =
        		"INSERT INTO customer(customer_name, account_number, balance) VALUES (?, ?, ?)";
        try (Connection connection =
                     DBConnection.getConnection();

             PreparedStatement statement =
                     connection.prepareStatement(query)) {

            statement.setString(
                    1,
                    customer.getName());

            statement.setString(
                    2,
                    customer.getAccountNumber());

            statement.setDouble(
                    3,
                    customer.getBalance());

            int rowsAffected =
                    statement.executeUpdate();

            if (rowsAffected > 0) {

                System.out.println(
                        "Customer account created successfully.");
            }

        } catch (SQLException exception) {

            System.out.println(
                    "Unable to create customer account.");

            exception.printStackTrace();
        }
    }

   
     // Displays all customer accounts.
     
    public void viewCustomers() {

        String query = "SELECT * FROM customer";

        try (Connection connection =
                     DBConnection.getConnection();

             PreparedStatement statement =
                     connection.prepareStatement(query);

             ResultSet resultSet =
                     statement.executeQuery()) {

        	while(resultSet.next()) {
        	    System.out.println(
        	    		resultSet.getString("account_number") + " " +
        	    				resultSet.getString("customer_name") + " " +
        	    				resultSet.getDouble("balance")
        	    );
        	}

        } catch (SQLException exception) {

            exception.printStackTrace();
        }
    }

  
     //Updates customer balance.
   
    public void updateBalance(
            String accountNumber,
            double balance) {

        String query =
                "UPDATE customer SET balance=? WHERE account_number=?";

        try (Connection connection =
                     DBConnection.getConnection();

             PreparedStatement statement =
                     connection.prepareStatement(query)) {

            statement.setDouble(1, balance);
            statement.setString(2, accountNumber);

            int rowsAffected =
                    statement.executeUpdate();

            if (rowsAffected > 0) {

                System.out.println(
                        "Balance updated successfully.");
            }

        } catch (SQLException exception) {

            exception.printStackTrace();
        }
    }

    
     // Deletes a customer account.
    
    public void deleteCustomer(
            String accountNumber) {

        String query =
                "DELETE FROM customer WHERE account_number=?";

        try (Connection connection =
                     DBConnection.getConnection();

             PreparedStatement statement =
                     connection.prepareStatement(query)) {

            statement.setString(1, accountNumber);

            int rowsAffected =
                    statement.executeUpdate();

            if (rowsAffected > 0) {

                System.out.println(
                        "Customer account deleted successfully.");
            }

        } catch (SQLException exception) {

            exception.printStackTrace();
        }
    }
}