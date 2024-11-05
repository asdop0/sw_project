package com.asd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asd.common.OrderStatus;
import com.asd.model.Order;
import com.asd.model.User;

public interface OrderRepository extends JpaRepository<Order, Long>{
	List<Order> findAllByUserAndDeleteFalse(User user);
	List<Order> findAllByUserAndDeleteFalseAndStatusCancelled(User user);
	List<Order> findByStatus(OrderStatus status);
}
