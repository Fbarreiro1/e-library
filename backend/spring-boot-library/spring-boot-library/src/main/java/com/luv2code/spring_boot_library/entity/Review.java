package com.luv2code.spring_boot_library.entity;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import org.hibernate.annotations.CreationTimestamp;
import lombok.Data;
import java.util.Date;


@Entity
@Table(name="review")
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long Id;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="date")
    @CreationTimestamp
    private Date date;

    @Column(name="rating")
    private double rating;

    @Column(name="book_id")
    private Long bookId;

    @Column(name="review_description")
    private String reviewkDescription;
}
