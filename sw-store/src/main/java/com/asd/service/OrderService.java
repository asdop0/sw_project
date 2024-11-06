package com.asd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asd.DTO.CanceledOrderDto;
import com.asd.DTO.OrderDetailDto;
import com.asd.DTO.OrderDto;
import com.asd.common.OrderStatus;
import com.asd.model.CanceledOrder;
import com.asd.model.Order;
import com.asd.model.OrderDetail;
import com.asd.model.Product;
import com.asd.model.User;
import com.asd.repository.CanceledOrderRepository;
import com.asd.repository.OrderRepository;
import com.asd.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderService {
	private final OrderRepository orderRepository;
	private final ProductRepository productRepository;
	private final CanceledOrderRepository canceledOrderRepository;
	
	//전달받은 주문 저장
	@Transactional
	public void addOrder(Order order) {
		Product product = order.getOrderDetail().getProduct();
		product.setTotalSales(product.getTotalSales() + 1);
		
		productRepository.save(product);
		orderRepository.save(order);
	}
	
	//주문 취소
	@Transactional
	public void cancelOrder(Long id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> 
        	new IllegalArgumentException("[cancelOrder] 주문을 찾을 수 없습니다.")
		);
		order.setStatus(OrderStatus.CANCELLED);
		//결제 관련 로직 필요
		
		orderRepository.save(order);		
	}
	
	//주문 삭제
	@Transactional
	public void deleteOrder(Long id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> 
        	new IllegalArgumentException("[deleteOrder] 주문을 찾을 수 없습니다.")
		);
		order.setDelete(true);
		
		orderRepository.save(order);		
	}
	
	//해당 유저의 주문 내역 조회
	public List<OrderDto> orderLists(User user) {
		List<Order> orders = orderRepository.findAllByUserAndDeleteFalse(user);
		List<OrderDto> orderDtos = new ArrayList<>();
		for(Order order : orders) {
            orderDtos.add(OrderDto.toDto(order));
        }
        return orderDtos;
	}
	
	//지정된 주문의 상세정보를 출력
	public OrderDetailDto viewOrderDetail(Long id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> 
    		new IllegalArgumentException("[viewOrderDetail] 주문을 찾을 수 없습니다.")
		);
		OrderDetail orderDetail = order.getOrderDetail();
			
		return OrderDetailDto.toDto(orderDetail);
	}
	
	//해당 유저의 취소 내역 조회
	public List<OrderDto> cencelLists(User user) {
		List<Order> orders = orderRepository.findAllByUserAndDeleteFalseAndStatus(user, OrderStatus.CANCELLED);
		List<OrderDto> orderDtos = new ArrayList<>();
		for(Order order : orders) {
            orderDtos.add(OrderDto.toDto(order));
        }
        return orderDtos;
	}
	
	//지정된 취소 상세정보를 출력
	public CanceledOrderDto viewCencelDetail(Long id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> 
    		new IllegalArgumentException("[viewCencelDetail] 주문을 찾을 수 없습니다.")
		);
		CanceledOrder canceledOrder = canceledOrderRepository.findByOrder(order).orElseThrow(() -> 
			new IllegalArgumentException("[viewCencelDetail] 취소상세를 찾을 수 없습니다.")
		);
			
		return CanceledOrderDto.toDto(canceledOrder);
	}
	
	//전체 주문 내역 출력
	public List<OrderDto> fullOrderLists() {
		List<Order> orders = orderRepository.findAll();
		List<OrderDto> orderDtos = new ArrayList<>();
		for(Order order : orders) {
            orderDtos.add(OrderDto.toDto(order));
        }
        return orderDtos;
	}
	
	//결제 대기 목록 출력
	public List<OrderDto> PendingLists() {
		List<Order> orders = orderRepository.findByStatus(OrderStatus.PENDING);
		List<OrderDto> orderDtos = new ArrayList<>();
		for(Order order : orders) {
            orderDtos.add(OrderDto.toDto(order));
        }
        return orderDtos;
	}
	
	//결제 승인
	@Transactional
	public void approvalOrder(Long id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> 
			new IllegalArgumentException("[approvalOrder] 주문을 찾을 수 없습니다.")
		);
		order.setStatus(OrderStatus.PAID);
		orderRepository.save(order);
	}
}
