package com.asd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.asd.model.Post;

public interface PostRepository extends JpaRepository<Post, Long>{
	Optional<Post> findById(Long id);
	
	@Query("SELECT p FROM Post p ORDER BY count DESC")
	List<Post> findByViewList();
			
	@Query("SELECT p FROM Post p LEFT JOIN p.comments c GROUP BY p ORDER BY COUNT(c) DESC")
	List<Post> findByCommentList();
	
	@Query("SELECT p FROM Post p WHERE p.title LIKE %?1%")
    List<Post> findByTitleContaining(String keyword);
}
