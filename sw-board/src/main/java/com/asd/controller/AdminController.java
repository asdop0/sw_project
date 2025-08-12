package com.asd.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asd.service.CommentService;
import com.asd.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board/admin")
public class AdminController {
	private final PostService postService;
	private final CommentService commentService;
	private Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	//게시글 삭제
	@DeleteMapping("/posts/{post_id}")
	public Map<String, String> deletePost(@PathVariable String post_id) {
		postService.deletePost(Long.parseLong(post_id));
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[deleteBoard] 관리자가 게시글을 삭제했습니다.");
    	return response;
	}
	
	//댓글 삭제
	@DeleteMapping("/comments/{comment_id}")
	public Map<String, String> deleteComment(@PathVariable String comment_id) {
		commentService.deleteComment(Long.parseLong(comment_id));
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[deleteComment] 관리자가 댓글을 삭제했습니다.");
    	return response;
	}
}
