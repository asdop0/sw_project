package com.asd.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asd.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> getByUid(String uid);
}
