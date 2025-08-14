package com.asd.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.CanceledOrderDto;
import com.asd.DTO.OrderDetailDto;
import com.asd.DTO.OrderDto;
import com.asd.common.OrderStatus;
import com.asd.model.Address;
import com.asd.model.OrderDetail;
import com.asd.model.OrderTable;
import com.asd.model.Product;
import com.asd.model.User;
import com.asd.service.AddressService;
import com.asd.service.OrderService;
import com.asd.service.ProductService;
import com.asd.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/store/orders")
public class OrderController {
	private final OrderService orderService;
	private final UserService userService;
	private final ProductService productService;
	private final AddressService addressService;
	private Logger logger = LoggerFactory.getLogger(OrderController.class);
	
	//주문 등록 + 주문 내역 상세 등록
	@PostMapping("/{product_id}")
	public Map<String, String> addOrder(HttpServletRequest request, @PathVariable Long product_id,
			@RequestBody Map<String, String> requestData) {
		User user = userService.findUser(request); //유저 정보 추출
		Product product = productService.getProduct(product_id); //상품 정보 추출
		Address address = addressService.getAddress(user); //배송지 정보 추출
		int cnt = Integer.parseInt(requestData.get("cnt"));
		
		OrderTable order = new OrderTable();
		order.setUser(user);
		order.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(cnt))); //상품 가격에 개수를 곱함
		order.setStatus(OrderStatus.PENDING);
		order.setRemove(false);
		
		OrderDetail orderDetail = new OrderDetail();
		orderDetail.setProduct(product);
		orderDetail.setPrice(product.getPrice());
		orderDetail.setCnt(cnt);
		orderDetail.setName(address.getName());
		orderDetail.setAddr(address.getAddr());
		orderDetail.setPhonenumber(address.getPhonenumber());
		orderDetail.setReq(address.getReq());
				
		orderDetail.setOrderTable(order);
		order.setOrderDetail(orderDetail);
		
		orderService.addOrder(order);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[addOrder] {} 사용자가 {} 상품을 {}개 주문했습니다.", user.getId(), product_id, cnt);
    	return response;
	}
	
	//주문 취소(환불 개념)
	@PostMapping("/cancellations/{order_id}")
	public Map<String, String> cancelOrder(@PathVariable Long order_id, @RequestBody Map<String, String> requestData) {
		orderService.cancelOrder(order_id, requestData.get("reason"));
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[cancelOrder] {} 주문이 취소되었습니다.", order_id);
    	return response;
	}
		
	//주문 내역 삭제
	@DeleteMapping("/{order_id}") //사용자의 입장에서 삭제, 실제 DB에는 주문 데이터가 남아있음
	public Map<String, String> deleteOrder(@PathVariable Long order_id) {
		orderService.deleteOrder(order_id);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//주문 내역 전체 리스트 출력
	@GetMapping
	public List<OrderDto> getOrderList(HttpServletRequest request) {
		User user = userService.findUser(request); //유저 정보 추출
		return orderService.orderList(user);
	}
	
	//주문 내역 상세 출력
	@GetMapping("/{order_id}")
	public OrderDetailDto viewOrderDetail(@PathVariable Long order_id) {
		return orderService.viewOrderDetail(order_id);
	}
	
	//취소 내역 전체 리스트 출력
	@GetMapping("/cancellations")
	public List<OrderDto> getCancelList(HttpServletRequest request) {
		User user = userService.findUser(request); //유저 정보 추출
		return orderService.cancelList(user);
	}
	
	//취소 내역 상세 출력
	@GetMapping("/cancellations/{order_id}")
	public CanceledOrderDto viewCancelDetail(@PathVariable Long order_id) {
		return orderService.viewCancelDetail(order_id);
	}
}
