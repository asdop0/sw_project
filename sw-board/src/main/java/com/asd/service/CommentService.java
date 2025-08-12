package com.asd.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asd.model.Comment;
import com.asd.model.Post;
import com.asd.repository.CommentRepository;
import com.asd.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	private final CommentRepository commentRepository;
	private final PostRepository postRepository;
	
	//지정된 댓글 삭제
	@Transactional
	public void deleteComment(Long id) {
		Comment comment = commentRepository.findById(id).orElseThrow(() -> 
			new IllegalArgumentException("[deleteComment] 해당 댓글을 찾을 수 없습니다.")
		);
		Post post = comment.getPost();
		post.getComments().remove(comment);
		
		commentRepository.delete(comment);
		postRepository.save(post);
	}
}
