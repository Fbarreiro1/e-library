package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.entity.Review;
import com.luv2code.spring_boot_library.dao.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review findReviewByUserAndBook(String userEmail, Long bookId) {
        System.out.println("findReviewByUserAndBook called with userEmail: " + userEmail + " and bookId: " + bookId);
        Review review = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
        System.out.println("Review retrieved from repository: " + review);
        return review != null ? review : new Review(); // Return an empty Review object if no review found
    }
}

