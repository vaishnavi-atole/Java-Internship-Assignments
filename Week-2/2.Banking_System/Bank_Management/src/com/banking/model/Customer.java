package com.banking.model;



 // Represents a customer account in the banking system.
 
public class Customer {

    private String name;
    private String accountNumber;
    private double balance;

        //Parameterized constructor to initialize the customer details
   
    public Customer(String name,
                    String accountNumber,
                    double balance) {

        this.name = name;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public String getName() {
        return name;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }
}