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

import com.asd.DTO.CategoryDto;
import com.asd.model.Category;
import com.asd.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/store/category/admin")
public class CategoryController {
	private final CategoryService categoryService;
	
	//카테고리 추가
	@PostMapping
	public Map<String, String> addCategory(@RequestBody Map<String, String> requestData) {
		Category category = new Category(); //카테고리 정보 삽입
		category.setName(requestData.get("name"));
		categoryService.addCategory(category);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//카테고리 수정
	@PatchMapping("/{category_id}")
	public Map<String, String> modifyCategory(@PathVariable Long category_id, @RequestBody Map<String, String> requestData) {
		Category category = new Category(); //카테고리 수정 정보 삽입
		category.setId(category_id);	
		category.setName(requestData.get("name"));
		categoryService.modifyCategory(category);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//카테고리 삭제
	@DeleteMapping("/{category_id}")
	public Map<String, String> deleteCategory(@PathVariable Long category_id) {
		categoryService.deleteCategory(category_id);
		Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
	}
	
	//카테고리 목록 출력
	@GetMapping
	public List<CategoryDto> getCategoryList() {
		return categoryService.categoryList();
	}
}
