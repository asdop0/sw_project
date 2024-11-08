package com.asd.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
@RequestMapping("/productReview")
public class ReviewController {
	private final UserService userService;
	private final ReviewService reviewService;
	private final ProductService productService;
	
	//후기 등록
	@PostMapping("/add")
	public Map<String, String> addReview(HttpServletRequest request, @RequestParam String product_id, @RequestParam String content) {
		User user = userService.findUser(request); //유저 정보 추출
		
		ProductReview productReview = new ProductReview(); //후기 정보 삽입
		productReview.setContent(content);
		productReview.setUser(user);
		
		Product product = productService.getProduct(Long.parseLong(product_id)); //해당 상품 추출
		product.addProductReview(productReview);
		
		productService.addProduct(product); //cascade를 통한 후기 저장
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//후기 삭제
	@DeleteMapping("/delete")
	public Map<String, String> deleteReview(@RequestParam String review_id) {
		reviewService.deleteReview(Long.parseLong(review_id));
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
}
