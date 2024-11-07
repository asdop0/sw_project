package com.asd.controller;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.model.Camping;
import com.asd.service.CampingService;
import com.asd.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/admin")
public class AdminController {
	private final CampingService campingService;
	private final ReviewService reviewService;
	
	//캠핑장 삭제
	@DeleteMapping("/delete")
	public boolean deleteCamping(@RequestParam String camping_id) {
		campingService.deleteCamping(Long.parseLong(camping_id));
		return true;
	}
	
	//캠핑장 등록
	@PostMapping("/add")
	public boolean addCamping(@RequestParam String name, @RequestParam String address, @RequestParam String district 
			, @RequestParam String homepage, @RequestParam String latitude, @RequestParam String longitude
			, @RequestParam String phonenumber) {
		Camping camping = new Camping(); //캠핑장 정보 삽입
		camping.setName(name);
		camping.setAddress(address);
		camping.setDistrict(district);
		camping.setHomepage(homepage);
		camping.setLatitude(Integer.parseInt(latitude));
		camping.setWriteDate(LocalDateTime.now());
		camping.setLongitude(Integer.parseInt(longitude));
		camping.setPhonenumber(phonenumber);
		
		campingService.addCamping(camping);
		
		return true;
	}
	
	//캠핑장 정보 수정
	@PostMapping("/modify")
	public boolean modifyCamping(@RequestParam String camping_id, @RequestParam String name
			, @RequestParam String homepage, @RequestParam String phonenumber) {
		Camping camping = new Camping(); //캠핑장 수정 정보 삽입
		camping.setId(Long.parseLong(camping_id));	
		camping.setName(name);
		camping.setHomepage(homepage);
		camping.setPhonenumber(phonenumber);
		campingService.modifyCamping(camping);
		return true;
	}
	
	//후기 삭제
	@DeleteMapping("/delete/review")
	public boolean deleteReview(@RequestParam String review_id) {
		reviewService.deleteReview(Long.parseLong(review_id));
		return true;
	}
}
