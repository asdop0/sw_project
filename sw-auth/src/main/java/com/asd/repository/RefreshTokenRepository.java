package com.asd.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asd.model.RefreshToken;
import com.asd.model.User;

import jakarta.transaction.Transactional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>{
	Optional<RefreshToken> getByUser(User user);
	
	@Transactional
	void deleteByUser(User user);
}
