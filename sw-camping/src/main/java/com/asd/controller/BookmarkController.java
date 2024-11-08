package com.asd.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.CampingListDto;
import com.asd.model.Camping;
import com.asd.model.CampingBookmark;
import com.asd.model.User;
import com.asd.service.BookmarkService;
import com.asd.service.CampingService;
import com.asd.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/campingBookmark")
public class BookmarkController {
	private final UserService userService;
	private final CampingService campingService;
	private final BookmarkService bookmarkService;
	
	//즐겨찾기 리스트 조회
	@GetMapping("/list")
	public List<CampingListDto> getBookmarkList(HttpServletRequest request) {
		User user = userService.findUser(request); //유저 정보 추출
		return bookmarkService.bookmarkList(user);
	}
	
	//즐겨찾기 추가
	@PostMapping("/add")
	public Map<String, String> addBookmark(HttpServletRequest request, @RequestParam String camping_id) {
		User user = userService.findUser(request); //유저 정보 추출
		
		CampingBookmark campingBookmark = new CampingBookmark(); //즐겨찾기 정보 삽입
		campingBookmark.setUser(user);
		
		Camping camping = campingService.getCamping(Long.parseLong(camping_id)); //해당 캠핑장 추출
		camping.addCampingBookmark(campingBookmark);
		
		campingService.addCamping(camping); //cascade를 통한 즐겨찾기 저장
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//즐겨찾기 삭제
	@DeleteMapping("/delete")
	public Map<String, String> deleteBookmark(HttpServletRequest request, @RequestParam String camping_id) {
		User user = userService.findUser(request); //유저 정보 추출
		bookmarkService.deleteBookmark(user, campingService.getCamping(Long.parseLong(camping_id)));
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
}
