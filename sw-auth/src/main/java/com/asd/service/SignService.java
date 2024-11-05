package com.asd.service;

import java.util.Collections;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.asd.DTO.SignInResultDto;
import com.asd.DTO.SignUpResultDto;
import com.asd.common.CommonResponse;
import com.asd.model.User;
import com.asd.repository.RefreshTokenRepository;
import com.asd.repository.UserRepository;
import com.asd.security.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    
    //회원가입
    public SignUpResultDto signUp(String id, String password, String name, String role, 
    		String nickname, String email) {
        // TODO Auto-generated method stub
        User user;
        if (role.equalsIgnoreCase("admin")) {
            user = User.builder().uid(id).name(name).password(passwordEncoder.encode(password)).email(email)
                    .roles(Collections.singletonList("ROLE_ADMIN")).nickname(nickname).status(false).build();
        } else {
            user = User.builder().uid(id).name(name).password(passwordEncoder.encode(password)).email(email)
                    .roles(Collections.singletonList("ROLE_USER")).nickname(nickname).status(false).build();
        }
        User savedUser = userRepository.save(user);
        SignUpResultDto signUpResultDto = new SignUpResultDto();
        if (!savedUser.getName().isEmpty()) {
            setSuccessResult(signUpResultDto);
        } else {
            setFailResult(signUpResultDto);
        }
        return signUpResultDto;
    }
    
    //로그인
    public SignInResultDto signIn(String id, String password) throws RuntimeException {
        // TODO Auto-generated method stub
        User user = userRepository.getByUid(id).orElseThrow(() -> 
    		new IllegalArgumentException("[signIn] 해당 유저를 찾을 수 없습니다.")
        );
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException();
        }
        if (refreshTokenRepository.getByUser(user).isPresent()) {
        	refreshTokenRepository.deleteByUser(user);
        }
        SignInResultDto signInResultDto = SignInResultDto.builder()
                .refreshToken(jwtTokenProvider.createRefreshToken(String.valueOf(user.getUid()), user.getRoles()))
                .accessToken(jwtTokenProvider.createAccessToken(String.valueOf(user.getUid()), user.getRoles()))
                .role(user.getRoles().get(0)).build();
        setSuccessResult(signInResultDto);
        return signInResultDto;
    }
    
    //성공시
    private void setSuccessResult(SignUpResultDto result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }
    
    //실패시
    private void setFailResult(SignUpResultDto result) {
        result.setSuccess(false);
        result.setCode(CommonResponse.FAIL.getCode());
        result.setMsg(CommonResponse.FAIL.getMsg());
    }
    
    //액세스 토큰 재발급
    public SignInResultDto refresh(HttpServletRequest request) throws RuntimeException{
    	String token = jwtTokenProvider.resolveToken(request);
    	User user = userRepository.getByUid(jwtTokenProvider.getUsername(token)).orElseThrow(() -> 
    		new IllegalArgumentException("[refresh] 해당 유저를 찾을 수 없습니다.")
    	);
    	if(!refreshTokenRepository.getByUser(user).get().getRefreshToken().equals(token)) {
    		throw new RuntimeException();
    	}
    	SignInResultDto signInResultDto = SignInResultDto.builder().accessToken(jwtTokenProvider.createAccessToken(String.valueOf(user.getUid()), user.getRoles())).build();
    	setSuccessResult(signInResultDto);
    	return signInResultDto;
    }
    
    //로그아웃
    public void signOut(HttpServletRequest request) throws RuntimeException{
    	String token = jwtTokenProvider.resolveToken(request);
    	User user = userRepository.getByUid(jwtTokenProvider.getUsername(token)).orElseThrow(() -> 
    		new IllegalArgumentException("[signOut] 해당 유저를 찾을 수 없습니다.")
    	);
    	refreshTokenRepository.deleteByUser(user);
    }
    
    //회원탈퇴
    public void delete(HttpServletRequest request) throws RuntimeException{
    	String token = jwtTokenProvider.resolveToken(request);
    	User user = userRepository.getByUid(jwtTokenProvider.getUsername(token)).orElseThrow(() -> 
			new IllegalArgumentException("[signOut] 해당 유저를 찾을 수 없습니다.")
    	);
    	refreshTokenRepository.deleteByUser(user); //유저의 리프레쉬 토큰 삭제
    	user.setName("탈퇴한 사용자");
    	user.setNickname("탈퇴한 사용자");
    	user.setPassword(null);
    	user.setUid(null);
    	user.setStatus(true);
    	userRepository.save(user); //유저의 개인정보를 초기화 후 탈퇴 상태 추가
    }
    
    //아이디 중복 확인
    public boolean uidCheck(String uid) {
    	if(userRepository.getByUid(uid).isPresent()) {
    		return false; //중복 체크이므로 있으면 실패로 처리
    	} else {
    		return true;
    	}
    }
    
    //닉네임 중복 확인
    public boolean nicknameCheck(String nickname) {
    	if(userRepository.getByNickname(nickname).isPresent()) {
    		return false;
    	} else {
    		return true;
    	}
    }
}
