package com.asd.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
@RequestMapping("/store/address")
public class AddressController {
	private final UserService userService;
	private final AddressService addressService;
	
	//배송지 등록
	@PostMapping
	public Map<String, String> addAddress(HttpServletRequest request, @RequestBody AddressDto dto) {
		User user = userService.findUser(request); //유저 정보 추출
		Address address = new Address(); //배송지 정보 삽입
		address.setName(dto.getName());
		address.setAddr(dto.getAddr());
		address.setPhonenumber(dto.getPhonenumber());
		address.setReq(dto.getReq());
		address.setUser(user);
		address.setChoice(dto.getChoice()); //기본 배송지로 설정
		addressService.addAddress(address, user);
		
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//배송지 정보 수정
	@PatchMapping("/{address_id}")
	public Map<String, String> modifyAddress(@PathVariable Long address_id, @RequestBody Map<String, String> requestData) {	
		Address address = new Address(); //배송지 수정 정보 삽입
		address.setId(address_id);	
		address.setName(requestData.get("name"));
		address.setAddr(requestData.get("addr"));
		address.setPhonenumber(requestData.get("phonenumber"));
		address.setReq(requestData.get("req"));
		addressService.modifyAddress(address);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//배송지 삭제
	@DeleteMapping("/{address_id}")
	public Map<String, String> deleteAddress(@PathVariable Long address_id) {
		addressService.deleteAddress(address_id);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//배송지 전체 리스트 조회
	@GetMapping
	public List<AddressDto> getAddressList(HttpServletRequest request) {
		User user = userService.findUser(request);
		return addressService.addressList(user);
	}
	
	//배송지 상세정보
	@GetMapping("/{address_id}")
	public AddressDto viewAddress(@PathVariable Long address_id) {
		return addressService.viewAddress(address_id);
	}
	
	//기본 배송지로 변경
	@PatchMapping("/default/{address_id}")
	public Map<String, String> choiceAddress(HttpServletRequest request, @PathVariable Long address_id) {
		User user = userService.findUser(request); 
		addressService.choiceAddress(user, address_id);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//기본 배송지 출력
	@GetMapping("/default")
	public AddressDto getAddress(HttpServletRequest request) {
		User user = userService.findUser(request);
		return AddressDto.toDto(addressService.getAddress(user));
	}
}
