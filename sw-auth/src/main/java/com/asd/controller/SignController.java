package com.asd.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.SignInRequestDto;
import com.asd.DTO.SignInResultDto;
import com.asd.DTO.SignUpRequestDto;
import com.asd.DTO.SignUpResultDto;
import com.asd.service.SignService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sign-api")
public class SignController {
    private final SignService signService;
    private Logger logger = LoggerFactory.getLogger(SignController.class);
    
    //로그인
    @PostMapping("/sign-in")
    public SignInResultDto signIn(@RequestBody SignInRequestDto requestDto) throws IllegalArgumentException {
        logger.info("[signIn] 로그인을 시도하고 있습니다. id : {}, pw : ****", requestDto.getId());
        SignInResultDto signInResultDto = signService.signIn(requestDto.getId(), requestDto.getPassword());
        if (signInResultDto.getCode() == 0) {
            logger.info("[signIn] 정상적으로 로그인되었습니다. id : {}, accessToken : {}, refreshToken : {} ", requestDto.getId(), signInResultDto.getAccessToken(), signInResultDto.getRefreshToken());
        }
        return signInResultDto;
    }
    
    public boolean isInvalidName(String name) {
        List<String> forbiddenWords = Arrays.asList("탈퇴한 사용자", "관리자");
        return forbiddenWords.stream().anyMatch(name::equalsIgnoreCase);
    }
    
    //회원가입
    @PostMapping("/sign-up")
    public SignUpResultDto signUp(@RequestBody SignUpRequestDto requestDto) throws IllegalArgumentException{
        logger.info("[signUp] 회원가입을 수행합니다. id : {}, password : ****, name : {}, role : {}", requestDto.getId(), requestDto.getName(), "user");
        if (isInvalidName(requestDto.getName())) {
            throw new IllegalArgumentException("해당 이름은 사용할 수 없습니다.");
        }
        if (!signService.uidCheck(requestDto.getId())) {
        	throw new IllegalArgumentException("해당 아이디는 이미 존재합니다.");
        }
        if (!signService.nicknameCheck(requestDto.getName())) {
        	throw new IllegalArgumentException("해당 닉네임은 이미 존재합니다.");
        }
        SignUpResultDto signUpResultDto = signService.signUp(requestDto.getId(), requestDto.getPassword(), requestDto.getName(), "user", requestDto.getNickname(), requestDto.getEmail());
        logger.info("[signUp] 회원가입을 완료했습니다. id : {}", requestDto.getId());
        return signUpResultDto;
    }
    
    @GetMapping("/exception")
    public void exceptionTest() throws RuntimeException {
        throw new RuntimeException("접근이 금지되었습니다.");
    }
    
    @ExceptionHandler(RuntimeException.class)
    public Map<String, String> ExceptionHandler(RuntimeException e) {
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        logger.error("ExceptionHandler 호출, {}, {}", e.getCause(), e.getMessage());
        Map<String, String> map = new HashMap<>();
        map.put("error type", httpStatus.getReasonPhrase());
        map.put("code", "400");
        map.put("message", "에러 발생");
        return map;
    }
    
    //리프레쉬 토큰을 통한 액세스 토큰 재발급
    @PostMapping("/refresh")
    public SignInResultDto refresh(HttpServletRequest request) {
    	logger.info("[refresh] accessToken 재발급을 수행합니다.");
    	SignInResultDto SignInResultDto = signService.refresh(request);
    	logger.info("[refresh] accessToken 재발급을 완료했습니다.");
    	return SignInResultDto;
    }
    
    //로그아웃
    @PostMapping("/sign-out")
    public boolean signOut(HttpServletRequest request) {
    	logger.info("[signOut] signOut을 수행합니다.");
    	signService.signOut(request);
    	logger.info("[signOut] signOut을 완료했습니다.");
    	return true;
    }
    
    //회원탈퇴
    @DeleteMapping("/delete")
    public boolean delete(HttpServletRequest request) {
    	logger.info("[delete] delete을 수행합니다.");
    	signService.delete(request);
    	logger.info("[delete] delete을 완료했습니다.");
    	return true;
    }
    
    //아이디 중복 체크
    @PostMapping("uidCheck") //중복된 아이디가 있으면 false 반환, 없으면 true 반환
    public boolean uidCheck(@RequestParam String uid) {
    	logger.info("[uidCheck] uidCheck을 수행합니다.");
    	boolean bool = signService.uidCheck(uid);
    	logger.info("[uidCheck] uidCheck을 완료했습니다.");
    	return bool;
    }
    
    //닉네임 중복 체크
    @PostMapping("nicknameCheck") //중복된 닉네임이 있으면 false 반환, 없으면 true 반환
    public boolean nicknameCheck(@RequestParam String nickname) {
    	logger.info("[nicknameCheck] nicknameCheck을 수행합니다.");
    	if (isInvalidName(nickname)) {
            return false;
        }
    	boolean bool = signService.nicknameCheck(nickname);
    	logger.info("[nicknameCheck] nicknameCheck을 완료했습니다.");
    	return bool;
    }
}