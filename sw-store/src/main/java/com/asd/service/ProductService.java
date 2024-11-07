package com.asd.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.asd.DTO.ProductDetailDto;
import com.asd.DTO.ProductListDto;
import com.asd.model.Category;
import com.asd.model.Product;
import com.asd.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductService {
	private final ProductRepository productRepository;
	
	//상품 전체 리스트 출력
	public List<ProductListDto> productList() {
		List<Product> products = productRepository.findAllByStatusFalse();	
		List<ProductListDto> productListDtos = new ArrayList<>();
		for(Product product : products) {
			productListDtos.add(ProductListDto.toDto(product));
        }
		
		return productListDtos;
	}
	
	//해당 카테고리의 상품 리스트 출력
	public List<ProductListDto> categoryList(Category category) {
		List<Product> products = productRepository.findByCategoryAndStatusFalse(category);
		List<ProductListDto> productListDtos = new ArrayList<>();
		for(Product product : products) {
			productListDtos.add(ProductListDto.toDto(product));
        }
		
		return productListDtos;
	}
	
	//해당 카테고리의 상품을 최신순으로 출력
	public List<ProductListDto> updateList(Category category) {
		List<Product> products = productRepository.findProductOrderByWriteDate(category);
		List<ProductListDto> productListDtos = new ArrayList<>();
		for(Product product : products) {
			productListDtos.add(ProductListDto.toDto(product));
        }
		
		return productListDtos;
	}
	
	//해당 카테고리의 상품을 후기가 많은 순으로 출력
	public List<ProductListDto> reviewList(Category category) {
		List<Product> products = productRepository.findProductOrderByReviewCount(category);
		List<ProductListDto> productListDtos = new ArrayList<>();
		for(Product product : products) {
			productListDtos.add(ProductListDto.toDto(product));
        }
		
		return productListDtos;
	}
	
	//해당 카테고리의 상품을 즐겨찾기가 많은 순으로 출력
	public List<ProductListDto> bookmartList(Category category) {
		List<Product> products = productRepository.findProductOrderByBookmarkCount(category);
		List<ProductListDto> productListDtos = new ArrayList<>();
		for(Product product : products) {
			productListDtos.add(ProductListDto.toDto(product));
        }
		
		return productListDtos;
	}
	
	//해당 카테고리의 상품을 판매량이 많은 순으로 출력
	public List<ProductListDto> totalSalesList(Category category) {
		List<Product> products = productRepository.findProductOrderByTotalSalesCount(category);
		List<ProductListDto> productListDtos = new ArrayList<>();
		for(Product product : products) {
			productListDtos.add(ProductListDto.toDto(product));
        }
		
		return productListDtos;
	}
	
	//지정된 상품의 상세정보를 출력
	public ProductDetailDto viewProduct(Long id) {
		Product product = productRepository.findById(id).orElseThrow(() -> 
    		new IllegalArgumentException("[viewProduct] 상품을 찾을 수 없습니다.")
		);
		return ProductDetailDto.toDto(product);
	}
	
	//지정된 상품을 출력
	public Product getProduct(Long id) {
		Product product = productRepository.findById(id).orElseThrow(() -> 
    		new IllegalArgumentException("[viewProduct] 상품을 찾을 수 없습니다.")
		);
		return product;
	}
	
	//지정된 상품 삭제
	public void deleteProduct(Long id) {
		Product product = productRepository.findById(id).orElseThrow(() -> 
			new IllegalArgumentException("[deleteProduct] 상품을 찾을 수 없습니다.")
		);
		product.setStatus(true);
		productRepository.save(product);
	}
	
	//전달받은 상품 저장
	public void addProduct(Product product) {
		productRepository.save(product);
	}
	
	//전달받은 상품의 수정 정보로 저장
	public void modifyProduct(Product product) {
		Product product_ = productRepository.findById(product.getId()).orElseThrow(() -> 
        	new IllegalArgumentException("[modifyProduct] 수정할 상품을 찾을 수 없습니다.")
		); //기존의 상품 정보를 가져옴;
		
		product_.setName(product.getName());
		product_.setDescription(product.getDescription());
		product_.setPrice(product.getPrice());
		product_.setCnt(product.getCnt());
		product_.setCategory(product.getCategory());
		product_.setUpdateDate(LocalDateTime.now());
		
		productRepository.save(product_);		
	}
}
