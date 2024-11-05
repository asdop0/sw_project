package com.asd.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Product {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = true)
	private String description;
	
	@Column(nullable = false)
	private BigDecimal price;
	
	@Column(nullable = false)
	private Integer cnt;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="Category_id")
	private Category category;
	
	@CreationTimestamp
	@Column(name="write_date")
	private LocalDateTime writeDate;
	
	@Column(name="update_date")
	private LocalDateTime updateDate;
	
	//삭제여부, 삭제된 상태면 true
	private boolean status;
	
	@OneToMany(mappedBy="product", cascade = CascadeType.ALL)
	private List<ProductReview> productReviews;
	
	@OneToMany(mappedBy="product", cascade = CascadeType.ALL)
	private List<ProductBookmark> productBookmarks;
	
	@Column(nullable = false, name="total_sales")
	private Long totalSales;
	
	public void addProductReview(ProductReview productReview) {
		productReviews.add(productReview);
		productReview.setProduct(this);
	}
	
	public void addProductBookmark(ProductBookmark productBookmark) {
		productBookmarks.add(productBookmark);
		productBookmark.setProduct(this);
	}
}
