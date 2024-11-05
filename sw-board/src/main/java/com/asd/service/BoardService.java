package com.asd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.asd.DTO.BoardDetailDto;
import com.asd.DTO.BoardListDto;
import com.asd.model.Board;
import com.asd.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	private final BoardRepository boardRepository;
	
	//게시글 전체 리스트 출력
	public List<BoardListDto> boardLists() {
		List<Board> boards = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
		List<BoardListDto> boardListDtos = new ArrayList<>();
		for(Board board : boards) {
			boardListDtos.add(BoardListDto.toDto(board));
        }
		
		return boardListDtos;
	}
	
	//게시글을 조회순으로 출력
	public List<BoardListDto> viewLists() {
		List<Board> boards = boardRepository.findByViewLists();
		List<BoardListDto> boardListDtos = new ArrayList<>();
		for(Board board : boards) {
			boardListDtos.add(BoardListDto.toDto(board));
        }
		
		return boardListDtos;
	}
	
	//게시글을 댓글순으로 출력
	public List<BoardListDto> commentLists() {
		List<Board> boards = boardRepository.findByCommentLists();
		List<BoardListDto> boardListDtos = new ArrayList<>();
		for(Board board : boards) {
			boardListDtos.add(BoardListDto.toDto(board));
        }
		
		return boardListDtos;
	}
	
	//전달받은 게시글 저장
	public void addBoard(Board board) {
		boardRepository.save(board);
	}
	
	//지정된 게시글의 상세정보 출력
	public BoardDetailDto viewBoard(Long id) {
		Board board = boardRepository.findById(id).orElseThrow(() -> 
            new IllegalArgumentException("[viewBoard] 게시글을 찾을 수 없습니다.")
        );
		
		board.setCount(board.getCount() + 1L);
	    boardRepository.save(board);
		
		return BoardDetailDto.toDto(board);
	}
	
	//지정된 게시글 삭제
	public void deleteBoard(Long id) {
		boardRepository.deleteById(id);
	}
	
	//지정된 게시글 가져오기
	public Board getBoard(Long id) {
		Board board = boardRepository.findById(id).orElseThrow(() -> 
        	new IllegalArgumentException("[viewBoard] 게시글을 찾을 수 없습니다.")
		);
		
		return board;
	}
}
