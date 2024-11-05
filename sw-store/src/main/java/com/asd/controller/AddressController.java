package com.asd.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.AddressDto;
import com.asd.model.Address;
import com.asd.model.User;
import com.asd.service.AddressService;
import com.asd.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/address")
public class AddressController {
	private final UserService userService;
	private final AddressService addressService;
	
	//배송지 등록
	@PostMapping("/add")
	public boolean addAddress(HttpServletRequest request, @RequestParam String name,  
			@RequestParam String addr, @RequestParam String phonenumber, @RequestParam String req) {
		User user = userService.findUser(request); //유저 정보 추출
		Address address = new Address(); //배송지 정보 삽입
		address.setName(name);
		address.setAddr(addr);
		address.setPhonenumber(phonenumber);
		address.setReq(req);
		address.setUser(user);
		address.setChoice(true); //기본 배송지로 설정
		addressService.addAddress(address, user);
		
		return true;
	}
	
	//배송지 정보 수정
	@PostMapping("/modify")
	public boolean modifyAddress(@RequestParam String address_id, @RequestParam String name,  
			@RequestParam String addr, @RequestParam String phonenumber, @RequestParam String req) {	
		Address address = new Address(); //배송지 수정 정보 삽입
		address.setId(Long.parseLong(address_id));	
		address.setName(name);
		address.setAddr(addr);
		address.setPhonenumber(phonenumber);
		address.setReq(req);
		addressService.modifyAddress(address);
		return true;
	}
	
	//배송지 삭제
	@DeleteMapping("/delete")
	public boolean deleteAddress(@RequestParam String address_id) {
		addressService.deleteAddress(Long.parseLong(address_id));
		return true;
	}
	
	//배송지 전체 리스트 조회
	@GetMapping("/list")
	public List<AddressDto> getAddressList(HttpServletRequest request) {
		User user = userService.findUser(request);
		return addressService.addressLists(user);
	}
	
	//배송지 상세정보
	@GetMapping("/view")
	public AddressDto viewAddress(@RequestParam String address_id) {
		return addressService.viewAddress(Long.parseLong(address_id));
	}
	
	//기본 배송지로 변경
	@PostMapping("/choice")
	public boolean choiceAddress(HttpServletRequest request, @RequestParam String address_id) {
		User user = userService.findUser(request); 
		addressService.choiceAddress(user, Long.parseLong(address_id));
		return true;
	}
}
