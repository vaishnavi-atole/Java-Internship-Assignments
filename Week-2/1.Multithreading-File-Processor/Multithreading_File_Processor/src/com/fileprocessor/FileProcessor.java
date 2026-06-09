package com.fileprocessor;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

/*
 * FileProcessor implements Runnable so that each file
 * can be processed in a separate thread.
 */
public class FileProcessor implements Runnable {

	private String inputFile;
	private String outputFile;

	// Constructor to initialize input and output file paths
	public FileProcessor(String inputFile, String outputFile) {
		this.inputFile = inputFile;
		this.outputFile = outputFile;
	}

	@Override
	public void run() {

		/*
		 * Try-with-resources automatically closes BufferedReader and BufferedWriter
		 * after use.
		 */
		try (BufferedReader br = new BufferedReader(new FileReader(inputFile));

				BufferedWriter bw = new BufferedWriter(new FileWriter(outputFile))) {

			String line;

			// Read file line by line
			while ((line = br.readLine()) != null) {

				// Convert content to uppercase
				bw.write(line.toUpperCase());

				// Move to next line
				bw.newLine();
			}

			// Log successful file processing
			ProcessingLogger.log(inputFile + " processed by " + Thread.currentThread().getName());

		} catch (IOException e) {

			// Display error if file operation fails
			System.out.println("Error processing file: " + inputFile);
			e.printStackTrace();
		}
	}
}
