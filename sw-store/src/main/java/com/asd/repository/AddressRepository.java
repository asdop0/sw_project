package com.asd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.asd.model.Address;
import com.asd.model.User;

public interface AddressRepository extends JpaRepository<Address, Long>{
	@Query("SELECT s FROM com.asd.model.Address s WHERE s.user = :user")
	List<Address> findByAddressList(@Param("user") User user);
	
	Optional<Address> findById(Long id);
	
	Optional<Address> findByUserAndChoiceTrue(User user);
}
