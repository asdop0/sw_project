package com.asd.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.OrderDto;
import com.asd.DTO.ProductRequestDto;
import com.asd.DTO.UserOrderDto;
import com.asd.model.Product;
import com.asd.service.CategoryService;
import com.asd.service.OrderService;
import com.asd.service.ProductService;
import com.asd.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/store/admin")
public class AdminController {
	private final ProductService productService;
	private final ReviewService reviewService;
	private final OrderService orderService;
	private final CategoryService categoryService;
	private Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	//상품 등록
	@PostMapping
	public Map<String, String> addProduct(@RequestBody ProductRequestDto productRequestDto) {
		Product product = new Product(); //상품 정보 삽입
		product.setName(productRequestDto.getName());
		product.setDescription(productRequestDto.getDescription());
	    try {
	    	product.setPrice(new BigDecimal(productRequestDto.getPrice()));
	    } catch (NumberFormatException e) {
	        throw new IllegalArgumentException("Invalid price format: " + productRequestDto.getPrice(), e);
	    }
	    product.setWriteDate(LocalDateTime.now());
		product.setCategory(categoryService.getCategory(Long.parseLong(productRequestDto.getCategory())));
		product.setTotalSales(0L);
		
		productService.addProduct(product);
		
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[addProduct] 관리자가 {} 상품을 추가했습니다.", productRequestDto.getName());
    	return response;
	}
	
	//상품 정보 수정
	@PatchMapping("/{product_id}")
	public Map<String, String> modifyProduct(@PathVariable Long product_id, @RequestBody ProductRequestDto productRequestDto) {
		Product product = new Product(); //상품 수정 정보 삽입
		product.setId(product_id);
		product.setName(productRequestDto.getName());
		product.setDescription(productRequestDto.getDescription());
		try {
	    	product.setPrice(new BigDecimal(productRequestDto.getPrice()));
	    } catch (NumberFormatException e) {
	        throw new IllegalArgumentException("Invalid price format: " + productRequestDto.getPrice(), e);
	    }
		product.setCategory(categoryService.getCategory(Long.parseLong(productRequestDto.getCategory())));
		
		productService.modifyProduct(product);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[modifyProduct] 관리자가 {} 상품을 수정했습니다.", productRequestDto.getId());
    	return response;
	}
	
	//상품 삭제
	@DeleteMapping("/{product_id}")
	public Map<String, String> deleteProduct(@PathVariable Long product_id) {
		productService.deleteProduct(product_id);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[deleteProduct] 관리자가 {} 상품을 삭제했습니다.", product_id);
    	return response;
	}
	
	//후기 삭제
	@DeleteMapping("/reviews/{review_id}")
	public Map<String, String> deleteReview(@PathVariable Long review_id) {
		reviewService.deleteReview(review_id);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[deleteReview] 관리자가 {} 후기를 삭제했습니다.", review_id);
    	return response;
	}
	
	@GetMapping("/orders")
	public List<UserOrderDto> getOrders(@RequestParam(required = false) String date) {
	    if (date != null) {
	        return orderService.ordersByDate(date);
	    }
	    return orderService.fullOrderList();
	}
	
	//결제 대기 목록 출력
	@GetMapping("/orders/pending")
	public List<OrderDto> getPendingList() {
		return orderService.PendingList();
	}
	
	//결제 완료 
	@PatchMapping("/orders/{order_id}")
	public Map<String, String> approvalOrder(@PathVariable Long order_id) {
		orderService.approvalOrder(order_id);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[approvalOrder] 관리자가 {} 주문을 승인했습니다.", order_id);
    	return response;
	}
	
}
