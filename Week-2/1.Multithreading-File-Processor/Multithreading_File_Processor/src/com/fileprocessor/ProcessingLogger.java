package com.fileprocessor;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;


 /*Utility class responsible for logging
 file processing information.
 */
public class ProcessingLogger {

    /*
     synchronized ensures that only one thread
     writes to the log file at a time.
     */
    public static synchronized void log(String message) {

        try (
                BufferedWriter bw =
                        new BufferedWriter(
                                new FileWriter(
                                        "logs/processing.log",
                                        true))
        ) {

            bw.write(message);
            bw.newLine();

        } catch (IOException e) {

            System.out.println("Error writing log.");
            e.printStackTrace();
        }
    }
}