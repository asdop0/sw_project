package com.asd.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asd.model.User;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> getByUid(String uid);
	Optional<User> getByNickname(String nickname);
	Optional<User> getByNicknameAndName(String nickname, String name);
	
	@Transactional
	void deleteByUid(String uid);
}
