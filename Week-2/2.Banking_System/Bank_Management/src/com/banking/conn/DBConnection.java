package com.banking.conn;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


 //Utility class responsible for creating database connections.

public class DBConnection {

    private static final String URL =
            "jdbc:mysql://localhost:3306/banking_system";

    private static final String USER = "root";

    private static final String PASSWORD = "root";

   //return a database connection
    public static Connection getConnection()
            throws SQLException {

        return DriverManager.getConnection(
                URL,
                USER,
                PASSWORD
        );
    }
}