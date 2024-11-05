package com.asd.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.model.Category;
import com.asd.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/category")
public class CategoryController {
	private final CategoryService categoryService;
	
	//카테고리 추가
	@PostMapping("/add")
	public boolean addCategory(@RequestParam String name) {
		Category category = new Category(); //카테고리 정보 삽입
		category.setName(name);
		categoryService.addCategory(category);
		return true;
	}
	
	//카테고리 수정
	@PostMapping("/modify")
	public boolean modifyCategory(@RequestParam String category_id, @RequestParam String name) {
		Category category = new Category(); //카테고리 수정 정보 삽입
		category.setId(Long.parseLong(category_id));	
		category.setName(name);
		categoryService.modifyCategory(category);
		return true;
	}
	
	//카테고리 삭제
	@DeleteMapping("/delete")
	public boolean deleteCategory(@RequestParam String category_id) {
		categoryService.deleteCategory(Long.parseLong(category_id));
		return true;
	}
}
