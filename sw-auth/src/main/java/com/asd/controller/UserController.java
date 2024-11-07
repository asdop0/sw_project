package com.asd.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.UserDto;
import com.asd.model.User;
import com.asd.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private Logger logger = LoggerFactory.getLogger(UserController.class);
    
	//유저 정보 조회
    @GetMapping("/info")
    public UserDto getUserInfo(HttpServletRequest request) {
    	logger.info("[userInfo] userInfo를 수행합니다.");
    	UserDto userDto = userService.getUserInfo(request);
    	logger.info("[userInfo] userInfo를 완료했습니다.");
    	return userDto;
    }
    
    //유저 정보 수정
    @PostMapping("/modify")
    public boolean modifyUserInfo(HttpServletRequest request, @RequestParam String name,
    		@RequestParam String nickname) {
    	logger.info("[modifyUserInfo] modifyUserInfo를 수행합니다.");
    	User user = new User();
    	user.setName(name);
    	user.setNickname(nickname);
    	userService.modifyUserInfo(request, user);
    	logger.info("[modifyUserInfo] modifyUserInfo를 완료했습니다.");
    	return true;
    }
    
    //아이디 찾기
    @GetMapping("/find")
    public Map<String, String> findById(@RequestParam String nickname, @RequestParam String name) throws IllegalArgumentException{
    	logger.info("[findById] findById를 수행합니다.");
    	String id = userService.findById(nickname, name);
    	logger.info("[findById] findById를 완료했습니다.");   
    	Map<String, String> response = new HashMap<>();
    	response.put("id", id);
    	return response;
    }
    
    //비밀번호 변경
    @PostMapping("/modify/password")
    public boolean modifyPassword(HttpServletRequest request, @RequestParam String password,
    		@RequestParam String newPassword) {
    	logger.info("[modifyPassword] modifyPassword를 수행합니다.");
    	boolean bool = userService.modifyPassword(request, password, newPassword);
    	logger.info("[modifyPassword] modifyPassword를 완료했습니다.");
    	return bool;
    }
}
