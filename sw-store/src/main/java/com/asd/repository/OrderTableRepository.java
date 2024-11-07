package com.asd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asd.common.OrderStatus;
import com.asd.model.OrderTable;
import com.asd.model.User;

public interface OrderTableRepository extends JpaRepository<OrderTable, Long>{
	List<OrderTable> findAllByUserAndRemoveFalse(User user);
	List<OrderTable> findAllByUserAndRemoveFalseAndStatus(User user, OrderStatus status);
	List<OrderTable> findByStatus(OrderStatus status);
}
