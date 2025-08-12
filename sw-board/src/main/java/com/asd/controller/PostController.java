package com.asd.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.PostDetailDto;
import com.asd.DTO.PostListDto;
import com.asd.model.Post;
import com.asd.model.User;
import com.asd.service.PostService;
import com.asd.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board/posts")
public class PostController {
	private final PostService postService;
	private final UserService userService;
	private Logger logger = LoggerFactory.getLogger(PostController.class);
	
	//게시글 조회
	@GetMapping
	public List<PostListDto> getPosts( @RequestParam(required = false) String sort, 
			@RequestParam(required = false) String search) {
		
		if (search != null && !search.isEmpty()) {
            logger.info("[getPosts] 검색어로 조회: {}", search);
            return postService.searchPost(search);
        }
		
		if ("view".equals(sort)) {
            logger.info("[getPosts] 조회순 정렬");
            return postService.viewList();
        } else if ("comment".equals(sort)) {
            logger.info("[getPosts] 댓글순 정렬");
            return postService.commentList();
        }

        logger.info("[getPosts] 최신순 정렬");
        return postService.postList();
	}
	
	//게시글 상세정보
	@GetMapping("/{post_id}")
	public PostDetailDto viewPost(@PathVariable String post_id) {
		return postService.viewPost(Long.parseLong(post_id));
	}
	
	//게시글 추가
	@PostMapping
	public Map<String, String> addPost(HttpServletRequest request, @RequestParam String title, 
			@RequestParam String content) {
		User user = userService.findUser(request); //유저 정보 추출
		Post post = new Post(); //게시글 정보 삽입
		post.setCount(0L);
		post.setTitle(title);
		post.setContent(content);
		post.setUser(user);
		
		postService.addPost(post);

		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[addPost] {} 사용자가 {} 게시글을 생성했습니다.", user.getId(), title);
    	return response;
	}
	
	//게시글 삭제
	@DeleteMapping("/{post_id}")
	public Map<String, String> deletePost(@PathVariable String post_id) {
		postService.deletePost(Long.parseLong(post_id));
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[deletePost] 사용자가 {}번 게시글을 삭제했습니다.", post_id);
    	return response;
	}
}
