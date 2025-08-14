package com.asd.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.ProductDetailDto;
import com.asd.DTO.ProductListDto;
import com.asd.service.CategoryService;
import com.asd.service.ProductService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/store/products")
public class ProductController {
	private final ProductService productService;
	private final CategoryService categoryService;
	private Logger logger = LoggerFactory.getLogger(ProductController.class);
	
	//상품 전체 리스트 조회
	@GetMapping
	public List<ProductListDto> getProducts(@RequestParam(required = false) String search) {
		
		if (search != null && !search.isBlank()) {
	        logger.info("[getProducts] 검색: {}", search);
	        return productService.searchProduct(search);
	    }
		
		return productService.productList();
	}	
	
	//상품 상세정보
	@GetMapping("/{product_id}")
	public ProductDetailDto viewProduct(@PathVariable Long product_id) {
		return productService.viewProduct(product_id);
	}
	
	//해당 카테고리의 상품 리스트 조회, 정렬 조회
	@GetMapping("/category/{category_id}")
	public List<ProductListDto> getCategoryList(@PathVariable Long category_id, @RequestParam(required = false) String sort) {;
		
		logger.info("[getCategoryProducts] 카테고리 {} 상품 조회 (정렬: {})", category_id, sort);

	    if (sort == null || sort.isBlank()) {
	        return productService.categoryList(categoryService.getCategory(category_id));
	    }

	    switch (sort) {
	        case "update":
	            return productService.updateList(categoryService.getCategory(category_id));
	        case "review":
	            return productService.reviewList(categoryService.getCategory(category_id));
	        case "bookmart":
	            return productService.bookmartList(categoryService.getCategory(category_id));
	        case "totalSales":
	            return productService.totalSalesList(categoryService.getCategory(category_id));
	        default:
	            logger.warn("[getCategoryProducts] 알 수 없는 정렬 조건: {}", sort);
	            return productService.categoryList(categoryService.getCategory(category_id));
	    }
	}
}
