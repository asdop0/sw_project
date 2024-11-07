package com.asd.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.service.BoardService;
import com.asd.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
	private final BoardService boardService;
	private final CommentService commentService;
	
	//게시글 삭제
	@DeleteMapping("/deleteBoard")
	public boolean deleteBoard(@RequestParam String board_id) {
		boardService.deleteBoard(Long.parseLong(board_id));
		return true;
	}
	
	//댓글 삭제
	@DeleteMapping("/deleteComment")
	public boolean deleteComment(@RequestParam String comment_id) {
		commentService.deleteComment(Long.parseLong(comment_id));
		return true;
	}
}
