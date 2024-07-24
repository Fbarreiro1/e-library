package com.luv2code.spring_boot_library.controller;

import com.luv2code.spring_boot_library.entity.Book;
import com.luv2code.spring_boot_library.entity.Review;
import com.luv2code.spring_boot_library.responsemodels.ShelfCurrentLoansResponse;
import com.luv2code.spring_boot_library.service.BookService;
import com.luv2code.spring_boot_library.service.ReviewService;
import com.luv2code.spring_boot_library.util.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final ReviewService reviewService;

    @Autowired
    public BookController(BookService bookService, ReviewService reviewService) {
        System.out.println("BookController instantiated");
        this.bookService = bookService;
        this.reviewService = reviewService;
    }

    @GetMapping("/currentloans")
    public List<ShelfCurrentLoansResponse> getCurrentLoans(@RequestParam String token) throws Exception {
        System.out.println("Received token: " + token);
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "sub");
        System.out.println("Extracted user email: " + userEmail);
        List<ShelfCurrentLoansResponse> loans = bookService.currentLoans(userEmail);
        System.out.println("Loans: " + loans);
        return loans;
    }

     @GetMapping("/all")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @PutMapping("/checkout")
    public Book checkoutBook(@RequestParam Long bookId) throws Exception {
        System.out.println("checkoutBook called");
        String userEmail = "testuser@email.com";
        return bookService.checkoutBook(userEmail, bookId);
    }

    @GetMapping("/currentloans/count")
    public int currentLoansCount() throws Exception {
        String userEmail = "testuser@email.com";
        return bookService.currentLoansCount(userEmail);
    }

    @GetMapping("/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestParam Long bookId) throws Exception {
        String userEmail = "testuser@email.com";
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @GetMapping("/reviews/user/book")
    public Review getReviewByUserAndBook(@RequestParam Long bookId) {
        String userEmail = "testuser@email.com"; // Replace with actual user email
        System.out.println("getReviewByUserAndBook called with bookId: " + bookId);
        Review review = reviewService.findReviewByUserAndBook(userEmail, bookId);
        if (review == null) {
            System.out.println("Review not found for bookId: " + bookId + " and userEmail: " + userEmail);
        } else {
            System.out.println("Review found: " + review);
        }
        return review;
    }
}
