package com.asd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.asd.model.Category;
import com.asd.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	List<Product> findAllByStatusFalse();
	List<Product> findByCategoryAndStatusFalse(Category category);
	
	@Query("SELECT s FROM Product s WHERE s.category = :category AND s.status = false ORDER BY writeDate DESC")
	List<Product> findProductOrderByWriteDate(@Param("category") Category category);
			
	@Query("SELECT s FROM Product s LEFT JOIN s.productReviews c WHERE s.category = :category AND s.status = false GROUP BY s ORDER BY COUNT(c) DESC")
	List<Product> findProductOrderByReviewCount(@Param("category") Category category);
	
	@Query("SELECT s FROM Product s LEFT JOIN s.productBookmarks c WHERE s.category = :category AND s.status = false GROUP BY s ORDER BY COUNT(c) DESC")
	List<Product> findProductOrderByBookmarkCount(@Param("category") Category category);
	
	@Query("SELECT s FROM Product s WHERE s.category = :category AND s.status = false ORDER BY totalSales DESC")
	List<Product> findProductOrderByTotalSalesCount(@Param("category") Category category);
	
	Optional<Product> findById(Long id);
}
