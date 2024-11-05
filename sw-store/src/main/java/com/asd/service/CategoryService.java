package com.asd.service;

import org.springframework.stereotype.Service;

import com.asd.model.Category;
import com.asd.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CategoryService {
	private final CategoryRepository categoryRepository;

	//지정된 카테고리의 상세정보를 출력
	public Category getCategory(Long id) {
		Category category = categoryRepository.findById(id).orElseThrow(() -> 
    		new IllegalArgumentException("[viewCategory] 카테고리를 찾을 수 없습니다.")
		);
		return category;
	}
	
	//지정된 카테고리 삭제
	public void deleteCategory(Long id) {
		categoryRepository.deleteById(id);
	}
	
	//전달받은 카테고리 저장
	public void addCategory(Category category) {
		categoryRepository.save(category);
	}
	
	//전달받은 카테고리의 수정 정보로 저장
	public void modifyCategory(Category category) {
		Category category_ = categoryRepository.findById(category.getId()).orElseThrow(() -> 
        	new IllegalArgumentException("[modifyCategory] 수정할 카테고리를 찾을 수 없습니다.")
		); //기존의 카테고리 정보를 가져옴;
		
		category_.setName(category.getName());
		
		categoryRepository.save(category_);		
	}
}
