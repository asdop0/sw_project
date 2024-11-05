package com.asd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.asd.model.Product;
import com.asd.model.ProductBookmark;
import com.asd.model.User;

public interface ProductBookmarkRepository extends JpaRepository<ProductBookmark, Long>{
	@Query("SELECT s FROM com.asd.model.Product s WHERE s = (SELECT c.product b FROM com.asd.model.ProductBookmark c WHERE c.user = :user)")
	List<Product> findByBookmarkLists(@Param("user") User user);
	
	Optional<ProductBookmark> findByUserAndProduct(User user, Product product);
}
