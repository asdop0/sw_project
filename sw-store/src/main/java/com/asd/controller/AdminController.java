package com.asd.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.OrderDto;
import com.asd.model.Product;
import com.asd.service.CategoryService;
import com.asd.service.OrderService;
import com.asd.service.ProductService;
import com.asd.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/admin")
public class AdminController {
	private final ProductService productService;
	private final ReviewService reviewService;
	private final OrderService orderService;
	private final CategoryService categoryService;
	
	//상품 등록
	@PostMapping("/add")
	public boolean addProduct(@RequestParam String name, @RequestParam String description, @RequestParam String price 
			, @RequestParam String cnt, @RequestParam String category) {
		Product product = new Product(); //상품 정보 삽입
		product.setName(name);
		product.setDescription(description);
	    try {
	    	product.setPrice(new BigDecimal(price));
	    } catch (NumberFormatException e) {
	        throw new IllegalArgumentException("Invalid price format: " + price, e);
	    }
	    product.setWriteDate(LocalDateTime.now());
		product.setCnt(Integer.parseInt(cnt));
		product.setCategory(categoryService.getCategory(Long.parseLong(category)));
		product.setTotalSales(0L);
		
		productService.addProduct(product);
		
		return true;
	}
	
	//상품 정보 수정
	@PostMapping("/modify")
	public boolean modifyProduct(@RequestParam String product_id, @RequestParam String name, @RequestParam String description,
			@RequestParam String price, @RequestParam String cnt, @RequestParam String category) {
		Product product = new Product(); //상품 수정 정보 삽입
		product.setId(Long.parseLong(product_id));
		product.setName(name);
		product.setDescription(description);
		try {
	    	product.setPrice(new BigDecimal(price));
	    } catch (NumberFormatException e) {
	        throw new IllegalArgumentException("Invalid price format: " + price, e);
	    }
		product.setCnt(Integer.parseInt(cnt));
		product.setCategory(categoryService.getCategory(Long.parseLong(category)));
		
		productService.modifyProduct(product);
		return true;
	}
	
	//상품 삭제
	@DeleteMapping("/delete")
	public boolean deleteProduct(@RequestParam String product_id) {
			productService.deleteProduct(Long.parseLong(product_id));
		return true;
	}
	
	//후기 삭제
	@DeleteMapping("/delete/review")
	public boolean deleteReview(@RequestParam String review_id) {
		reviewService.deleteReview(Long.parseLong(review_id));
		return true;
	}
	
	//전체 주문 내역 출력
	@GetMapping("/orderList")
	public List<OrderDto> getFullOrderList() {
		return orderService.fullOrderList();
	}
	
	//결제 대기 목록 출력
	@GetMapping("/pendingList")
	public List<OrderDto> getPendingList() {
		return orderService.PendingList();
	}
	
	//결제 완료 
	@PostMapping("/approval")
	public boolean approvalOrder(@RequestParam String order_id) {
		orderService.approvalOrder(Long.parseLong(order_id));
		return true;
	}
	
}
