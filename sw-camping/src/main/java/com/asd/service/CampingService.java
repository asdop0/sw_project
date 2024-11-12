package com.asd.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.asd.DTO.CampingDetailDto;
import com.asd.DTO.CampingListDto;
import com.asd.model.Camping;
import com.asd.model.CampingElasticsearch;
import com.asd.repository.CampingElasticsearchRepository;
import com.asd.repository.CampingJpaRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CampingService {
	private final CampingJpaRepository campingRepository;
	private final CampingElasticsearchRepository campingElasticsearchRepository;
	
	private Logger logger = LoggerFactory.getLogger(CampingService.class);
	
	//캠핑장 전체 리스트 출력
	public List<CampingListDto> campingList() {
		List<Camping> campings = campingRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));	
		List<CampingListDto> campingListDtos = new ArrayList<>();
		for(Camping camping : campings) {
			campingListDtos.add(CampingListDto.toDto(camping));
        }
		
		return campingListDtos;
	}
	
	//해당 구역의 캠핑장 리스트 출력
	public List<CampingListDto> districtList(String district) {
		List<Camping> campings = campingRepository.findByDistrict(district);
		List<CampingListDto> campingListDtos = new ArrayList<>();
		for(Camping camping : campings) {
			campingListDtos.add(CampingListDto.toDto(camping));
        }
		
		return campingListDtos;
	}
	
	//해당 구역의 캠핑장을 최신순으로 출력
	public List<CampingListDto> updateList(String district) {
		List<Camping> campings = campingRepository.findCampingOrderByWriteDate(district);
		List<CampingListDto> campingListDtos = new ArrayList<>();
		for(Camping camping : campings) {
			campingListDtos.add(CampingListDto.toDto(camping));
        }
		
		return campingListDtos;
	}
	
	//해당 구역의 캠핑장을 후기가 많은 순으로 출력
	public List<CampingListDto> reviewList(String district) {
		List<Camping> campings = campingRepository.findCampingOrderByReviewCount(district);
		List<CampingListDto> campingListDtos = new ArrayList<>();
		for(Camping camping : campings) {
			campingListDtos.add(CampingListDto.toDto(camping));
        }
		
		return campingListDtos;
	}
	
	//해당 구역의 캠핑장을 즐겨찾기가 많은 순으로 출력
	public List<CampingListDto> bookmartList(String district) {
		List<Camping> campings = campingRepository.findCampingOrderByBookmarkCount(district);
		List<CampingListDto> campingListDtos = new ArrayList<>();
		for(Camping camping : campings) {
			campingListDtos.add(CampingListDto.toDto(camping));
        }
		
		return campingListDtos;
	}
	
	//지정된 캠핑장의 상세정보를 출력
	public CampingDetailDto viewCamping(Long id) {
		Camping camping = campingRepository.findById(id).orElseThrow(() -> 
    		new IllegalArgumentException("[viewCamping] 캠핑장을 찾을 수 없습니다.")
		);
		return CampingDetailDto.toDto(camping);
	}
	
	//지정된 캠핑장 삭제
	public void deleteCamping(Long id) {
		campingRepository.deleteById(id);
	}
	
	//전달받은 캠핑장 저장
	public void addCamping(Camping camping) {
		campingRepository.save(camping);
	}
	
	//전달받은 캠핑장의 수정 정보로 저장
	public void modifyCamping(Camping camping) {
		Camping camping_ = campingRepository.findById(camping.getId()).orElseThrow(() -> 
        	new IllegalArgumentException("[modifyCamping] 수정할 캠핑장을 찾을 수 없습니다.")
		);
		
		camping_.setName(camping.getName());
		camping_.setHomepage(camping.getHomepage());
		camping_.setPhonenumber(camping.getPhonenumber());
		
		campingRepository.save(camping_);		
	}
	
	//지정된 캠핑장 가져오기
	public Camping getCamping(Long id) {
		Camping camping = campingRepository.findById(id).orElseThrow(() -> 
    		new IllegalArgumentException("[viewCamping] 캠핑장을 찾을 수 없습니다.")
		);
		return camping;
	}
	
	//캠핑장 검색
	public List<CampingListDto> searchCamping(String search) {
		logger.info("[searchCamping] 검색 서비스 시작. 검색어: {}", search);
		List<CampingElasticsearch> campingElasticsearchs = campingElasticsearchRepository.searchByMultiMatch(search);
		logger.info("[searchCamping] 검색 서비스 시작. 검색어: {}", campingElasticsearchs);
		List<CampingListDto> campingListDtos = new ArrayList<>();
		for(CampingElasticsearch campingElasticsearch : campingElasticsearchs) {
			Camping camping = new Camping();
			camping.setId(campingElasticsearch.getId());
			camping.setName(campingElasticsearch.getName());
			camping.setAddress(campingElasticsearch.getAddress());
			camping.setLatitude(campingElasticsearch.getLatitude());
			camping.setLongitude(campingElasticsearch.getLongitude());
			camping.setWriteDate(campingElasticsearch.getWriteDate());
			campingListDtos.add(CampingListDto.toDto(camping));
        }
		
		return campingListDtos;
	}
}
