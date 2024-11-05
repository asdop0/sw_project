package com.asd.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asd.DTO.CartDto;
import com.asd.common.OrderStatus;
import com.asd.model.Address;
import com.asd.model.Cart;
import com.asd.model.Order;
import com.asd.model.OrderDetail;
import com.asd.model.Product;
import com.asd.model.User;
import com.asd.repository.CartRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CartService {
	private final CartRepository cartRepository;
	private final AddressService addressService;
	private final OrderService orderService;
	
	//전달받은 장바구니 저장
	public void addCart(Cart cart) {
		cartRepository.save(cart);
	}
	
	//지정된 장바구니 삭제
	public void deleteCart(Long id) {
		cartRepository.deleteById(id);
	}
	
	//장바구니 전체 리스트 출력
	public List<CartDto> cartLists(User user) {
		List<Cart> carts = cartRepository.findByCartLists(user);
		List<CartDto> cartDtos = new ArrayList<>();
		for (Cart cart : carts) {
			cartDtos.add(CartDto.toDto(cart));
		}
		return cartDtos;
	}
	
	//장바구니 구매
	@Transactional
	public void paymentCart(User user) {
		List<Cart> carts = cartRepository.findByCartLists(user);
		
		for (Cart cart : carts) {
			Product product = cart.getProduct(); //상품 정보 추출
			Address address = addressService.getAddress(user); //배송지 정보 추출
			
			Order order = new Order();
			order.setUser(user);
			order.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(cart.getCnt()))); //상품 가격에 개수를 곱함
			order.setStatus(OrderStatus.PENDING);
			order.setDelete(false);
			
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setProduct(product);
			orderDetail.setPrice(product.getPrice());
			orderDetail.setCnt(cart.getCnt());
			orderDetail.setName(address.getName());
			orderDetail.setAddr(address.getAddr());
			orderDetail.setPhonenumber(address.getPhonenumber());
			orderDetail.setReq(address.getReq());
					
			orderDetail.setOrder(order);
			order.setOrderDetail(orderDetail);
			
			orderService.addOrder(order);
		}
	}
}
