package com.asd.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.ProductListDto;
import com.asd.model.Product;
import com.asd.model.ProductBookmark;
import com.asd.model.User;
import com.asd.service.BookmarkService;
import com.asd.service.ProductService;
import com.asd.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/productBookmark")
public class BookmarkController {
	private final UserService userService;
	private final ProductService productService;
	private final BookmarkService bookmarkService;
	
	//즐겨찾기 리스트 조회
	@GetMapping("/list")
	public List<ProductListDto> bookmarkList(HttpServletRequest request) {
		User user = userService.findUser(request); //유저 정보 추출
		return bookmarkService.bookmarkLists(user);
	}
	
	//즐겨찾기 추가
	@PostMapping("/add")
	public boolean addBookmark(HttpServletRequest request, @RequestParam String product_id) {
		User user = userService.findUser(request); //유저 정보 추출
		
		ProductBookmark productBookmark = new ProductBookmark(); //즐겨찾기 정보 삽입
		productBookmark.setUser(user);
		
		Product product = productService.getProduct(Long.parseLong(product_id)); //해당 상품 추출
		product.addProductBookmark(productBookmark);
		
		productService.addProduct(product); //cascade를 통한 즐겨찾기 저장
		return true;
	}
	
	//즐겨찾기 삭제
	@DeleteMapping("/delete")
	public boolean deleteBookmark(HttpServletRequest request, @RequestParam String product_id) {
		User user = userService.findUser(request); //유저 정보 추출
		bookmarkService.deleteBookmark(user, productService.getProduct(Long.parseLong(product_id)));
		return true;
	}
}