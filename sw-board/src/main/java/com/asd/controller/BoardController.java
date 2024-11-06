package com.asd.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.BoardDetailDto;
import com.asd.DTO.BoardListDto;
import com.asd.model.Board;
import com.asd.model.User;
import com.asd.service.BoardService;
import com.asd.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
	private final BoardService boardService;
	private final UserService userService;
	
	//게시글 전체 조회
	@GetMapping("/list")
	public List<BoardListDto> getBoardList() {
		return boardService.boardLists();
	}
	
	//조건에 따른 정렬
	@GetMapping("/sort")
	public List<BoardListDto> getSortList(@RequestParam String condition) {
		switch(condition) {
		case "view" : //조회순
			return boardService.viewLists();
		case "comment" : //댓글순
			return boardService.commentLists();
		default : //최신순
			return boardService.boardLists();
		}
	}
	
	//게시글 상세정보
	@GetMapping("/view")
	public BoardDetailDto viewBoard(@RequestParam String board_id) {
		return boardService.viewBoard(Long.parseLong(board_id));
	}
	
	//게시글 추가
	@PostMapping("/add")
	public boolean addBoard(HttpServletRequest request, @RequestParam String title, 
			@RequestParam String content) {
		User user = userService.findUser(request); //유저 정보 추출
		Board board = new Board(); //게시글 정보 삽입
		board.setCount(0L);
		board.setTitle(title);
		board.setContent(content);
		board.setUser(user);
		
		boardService.addBoard(board);

		return true;
	}
	
	//게시글 삭제
	@DeleteMapping("/delete")
	public boolean deleteBoard(@RequestParam String board_id) {
		boardService.deleteBoard(Long.parseLong(board_id));
		return true;
	}
	
}