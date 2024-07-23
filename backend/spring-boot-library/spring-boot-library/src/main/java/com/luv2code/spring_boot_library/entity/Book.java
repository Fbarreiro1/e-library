package com.luv2code.spring_boot_library.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import lombok.Data; // Lombok annotation for getters, setters, and other methods
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="book")
@Data // Generates getters, setters, toString, equals, and hashCode methods
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long Id;

    @Column(name="title")
    @JsonProperty("title")
    private String title;

    @Column(name="author")
    @JsonProperty("author")
    private String author;

    @Column(name="description")
    @JsonProperty("description")
    private String description;

    @Column(name="copies")
    @JsonProperty("copies")
    private int copies;

    @Column(name="copies_available")
    @JsonProperty("copies_available")
    private int copiesAvailable;

    @Column(name="category")
    @JsonProperty("category")
    private String category;

    @Column(name="img")
    @JsonProperty("img")
    private String img;
}
