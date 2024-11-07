package com.asd.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.ProductDetailDto;
import com.asd.DTO.ProductListDto;
import com.asd.service.CategoryService;
import com.asd.service.ProductService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/product")
public class ProductController {
	private final ProductService productService;
	private final CategoryService categoryService;
	
	//상품 전체 리스트 조회
	@GetMapping("/list")
	public List<ProductListDto> getProductList() {
		return productService.productList();
	}
	
	//해당 카테고리의 상품 리스트 조회
	@GetMapping("/category")
	public List<ProductListDto> getCategoryList(@RequestParam String category_id) {
		return productService.categoryList(categoryService.getCategory(Long.parseLong(category_id)));
	}
	
	//조건에 따른 정렬
	@GetMapping("/sort")
	public List<ProductListDto> getSortList(@RequestParam String category_id, @RequestParam String condition) {
		switch(condition) {
		case "update" : //최신순
			return productService.updateList(categoryService.getCategory(Long.parseLong(category_id)));
		case "review" : //후기순
			return productService.reviewList(categoryService.getCategory(Long.parseLong(category_id)));
		case "bookmart" : //즐겨찾기순
			return productService.bookmartList(categoryService.getCategory(Long.parseLong(category_id)));
		case "totalSales" : //판매량순
			return productService.totalSalesList(categoryService.getCategory(Long.parseLong(category_id)));
		default :
			return productService.categoryList(categoryService.getCategory(Long.parseLong(category_id)));
		}
	}
	
	//상품 상세정보
	@GetMapping("/view")
	public ProductDetailDto viewProduct(@RequestParam String product_id) {
		return productService.viewProduct(Long.parseLong(product_id));
	}
}
