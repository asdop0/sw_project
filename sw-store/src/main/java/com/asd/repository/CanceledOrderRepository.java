package com.asd.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asd.model.CanceledOrder;
import com.asd.model.Order;

public interface CanceledOrderRepository extends JpaRepository<CanceledOrder, Long>{
	Optional<CanceledOrder> findByOrder(Order order);
}
