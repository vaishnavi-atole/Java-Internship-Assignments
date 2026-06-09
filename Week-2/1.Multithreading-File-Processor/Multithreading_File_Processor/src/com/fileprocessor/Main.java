package com.fileprocessor;


  //Main class to start file processing threads.
   public class Main {

    public static void main(String[] args) {

        // Thread for processing first file
        Thread thread1 = new Thread(
                new FileProcessor(
                        "input/file1.txt",
                        "output/output_file1.txt"));

        // Thread for processing second file
        Thread thread2 = new Thread(
                new FileProcessor(
                        "input/file2.txt",
                        "output/output_file2.txt"));

        System.out.println("Current Directory: " + System.getProperty("user.dir"));
        System.out.println("File1 Exists: " + new java.io.File("input/file1.txt").exists());
        System.out.println("File2 Exists: " + new java.io.File("input/file2.txt").exists());
        // Start both threads
        thread1.start();
        thread2.start();

        try {

            /*
             join() waits for both threads
             to complete before moving ahead.
             */
            thread1.join();
            thread2.join();

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println(
                "All files processed successfully.");
    }
}