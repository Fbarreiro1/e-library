package com.luv2code.spring_boot_library.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import com.luv2code.spring_boot_library.entity.Book;

@Configuration
public class RestConfiguration implements RepositoryRestConfigurer {
    public RestConfiguration() {
        System.out.println("RestConfiguration loaded");
    }
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Book.class); // Expose the ID field for the Book entity
    }
}
