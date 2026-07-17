package com.studentmanagement;

import com.studentmanagement.util.AppConstants;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class StudentManagementApplication {

    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone(AppConstants.APP_TIME_ZONE));
        SpringApplication.run(StudentManagementApplication.class, args);
    }
}
