package com.asd.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.CartDto;
import com.asd.model.Cart;
import com.asd.model.Product;
import com.asd.model.User;
import com.asd.service.CartService;
import com.asd.service.ProductService;
import com.asd.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/store/carts")
public class CartController {
	private final CartService cartService;
	private final UserService userService;
	private final ProductService productService;
	
	//장바구니 등록
	@PostMapping("/{product_id}")
	public Map<String, String> addCart(HttpServletRequest request, @PathVariable Long product_id, @RequestBody Map<String, String> requestData) {
		User user = userService.findUser(request); //유저 정보 추출
		Product product = productService.getProduct(product_id);
		int cnt = Integer.parseInt(requestData.get("cnt"));
		Cart cart = new Cart(); //장바구니 정보 삽입
		
		cart.setUser(user);
		cart.setProduct(product);
		cart.setPrice(product.getPrice().multiply(BigDecimal.valueOf(cnt))); //상품 가격에 개수를 곱함
		cart.setCnt(cnt);
		
		cartService.addCart(cart);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//장바구니 삭제
	@DeleteMapping("/{cart_id}")
	public Map<String, String> deleteCart(@PathVariable Long cart_id) {
		cartService.deleteCart(cart_id);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//장바구니 출력
	@GetMapping
	public List<CartDto> getCartList(HttpServletRequest request) {
		User user = userService.findUser(request); //유저 정보 추출
		return cartService.cartList(user);
	}
	
	//장바구니 구매
	@PostMapping("/checkout")
	public Map<String, String> paymentCart(HttpServletRequest request) {
		User user = userService.findUser(request); //유저 정보 추출
		
		cartService.paymentCart(user);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
}
