package com.asd.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.CampingDetailDto;
import com.asd.DTO.CampingListDto;
import com.asd.service.CampingService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/camping")
public class CampingController {
	private final CampingService campingService;	
	
	//캠핑장 전체 리스트 조회
	@GetMapping("/list")
	public List<CampingListDto> getCampingList() {
		return campingService.campingLists();
	}
	
	//해당 지역의 캠핑장 리스트 조회
	@GetMapping("/district")
	public List<CampingListDto> getDistrictList(@RequestParam String district) {
		return campingService.districtLists(district);
	}
	
	//조건에 따른 정렬
	@GetMapping("/sort")
	public List<CampingListDto> getSortList(@RequestParam String district, @RequestParam String condition) {
		switch(condition) {
		case "update" : //최신순
			return campingService.updateLists(district);
		case "review" : //후기순
			return campingService.reviewLists(district);
		case "bookmart" : //즐겨찾기순
			return campingService.bookmartLists(district);
		default :
			return campingService.districtLists(district);
		}
	}
	
	//캠핑장 상세정보
	@GetMapping("/view")
	public CampingDetailDto viewCamping(@RequestParam String camping_id) {
		return campingService.viewCamping(Long.parseLong(camping_id));
	}
}
