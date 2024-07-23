package com.luv2code.spring_boot_library;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(scanBasePackages = "com.luv2code.spring_boot_library")
public class SpringBootLibraryApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootLibraryApplication.class, args);
    }
}
