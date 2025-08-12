package com.asd.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asd.model.Comment;
import com.asd.model.Post;
import com.asd.model.User;
import com.asd.service.CommentService;
import com.asd.service.PostService;
import com.asd.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board/comments")
public class CommentController {
	private final PostService postService;
	private final UserService userService;
	private final CommentService commentService;
	
	//댓글 등록
	@PostMapping("/{post_id}")
	public Map<String, String> addComment(HttpServletRequest request, @PathVariable String post_id
			, @RequestBody Map<String, String> requestData) {
		User user = userService.findUser(request); //유저 정보 추출
		
		Comment comment = new Comment(); //댓글 정보 삽입
		comment.setComment(requestData.get("i_comment"));
		comment.setUser(user);
		
		Post post = postService.getPost(Long.parseLong(post_id));
		post.addComment(comment);
		
		postService.addPost(post);
		
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//댓글 삭제
	@DeleteMapping("/{comment_id}")
	public Map<String, String> deleteComment(@PathVariable String comment_id) {
		commentService.deleteComment(Long.parseLong(comment_id));
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
}
