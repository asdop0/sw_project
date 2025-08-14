package com.asd.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asd.model.Product;
import com.asd.model.ProductReview;
import com.asd.model.User;
import com.asd.service.ProductService;
import com.asd.service.ReviewService;
import com.asd.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/store/reviews")
public class ReviewController {
	private final UserService userService;
	private final ReviewService reviewService;
	private final ProductService productService;
	private Logger logger = LoggerFactory.getLogger(ReviewController.class);
	
	//후기 등록
	@PostMapping("/{product_id}")
	public Map<String, String> addReview(HttpServletRequest request, @PathVariable Long product_id, @RequestBody Map<String, String> requestData) {
		User user = userService.findUser(request); //유저 정보 추출
		
		ProductReview productReview = new ProductReview(); //후기 정보 삽입
		productReview.setContent(requestData.get("content"));
		productReview.setUser(user);
		
		Product product = productService.getProduct(product_id); //해당 상품 추출
		product.addProductReview(productReview);
		
		productService.addProduct(product); 
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[addReview] {} 사용자가 {} 상품의 후기를 작성했습니다.", user.getId(), product_id);
    	return response;
	}
	
	//후기 삭제
	@DeleteMapping("/{review_id}")
	public Map<String, String> deleteReview(@PathVariable Long review_id) {
		reviewService.deleteReview(review_id);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[deleteReview] 사용자가 {} 후기를 삭제합니다.", review_id);
    	return response;
	}
}
