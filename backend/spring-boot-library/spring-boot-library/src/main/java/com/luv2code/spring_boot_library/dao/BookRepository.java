package com.luv2code.spring_boot_library.dao;

import com.luv2code.spring_boot_library.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE b.category = :category")
    Page<Book> findByCategory(@Param("category") String category, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE b.title LIKE %:title%")
    Page<Book> findByTitleContaining(@Param("title") String title, Pageable pageable);

    @Query("SELECT o FROM Book o WHERE id in :book_ids")
    List<Book> findBooksByBookId(@Param("book_ids") List<Long> bookId);
}
