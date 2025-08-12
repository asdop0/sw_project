package com.asd.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.asd.DTO.PostDetailDto;
import com.asd.DTO.PostListDto;
import com.asd.model.Post;
import com.asd.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
	private final PostRepository postRepository;
	
	private Logger logger = LoggerFactory.getLogger(PostService.class);
	
	//게시글 전체 리스트 출력
	public List<PostListDto> postList() {
		List<Post> posts = postRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
		List<PostListDto> postListDtos = new ArrayList<>();
		for(Post post : posts) {
			postListDtos.add(PostListDto.toDto(post));
        }
		
		return postListDtos;
	}
	
	//게시글을 조회순으로 출력
	public List<PostListDto> viewList() {
		List<Post> posts = postRepository.findByViewList();
		List<PostListDto> postListDtos = new ArrayList<>();
		for(Post post : posts) {
			postListDtos.add(PostListDto.toDto(post));
        }
		
		return postListDtos;
	}
	
	//게시글을 댓글순으로 출력
	public List<PostListDto> commentList() {
		List<Post> posts = postRepository.findByCommentList();
		List<PostListDto> postListDtos = new ArrayList<>();
		for(Post post : posts) {
			postListDtos.add(PostListDto.toDto(post));
        }
		
		return postListDtos;
	}
	
	//전달받은 게시글 저장
	public void addPost(Post post) {
		postRepository.save(post);
	}
	
	//지정된 게시글의 상세정보 출력
	public PostDetailDto viewPost(Long id) {
		Post post = postRepository.findById(id).orElseThrow(() -> 
            new IllegalArgumentException("[viewPost] 게시글을 찾을 수 없습니다.")
        );
		
		post.setCount(post.getCount() + 1L);
		postRepository.save(post);
		
		return PostDetailDto.toDto(post);
	}
	
	//지정된 게시글 삭제
	public void deletePost(Long id) {
		postRepository.deleteById(id);
	}
	
	//지정된 게시글 가져오기
	public Post getPost(Long id) {
		Post post = postRepository.findById(id).orElseThrow(() -> 
        	new IllegalArgumentException("[getPost] 게시글을 찾을 수 없습니다.")
		);
		
		return post;
	}
	
	//게시글 검색
	public List<PostListDto> searchPost(String search) {
		String[] keywords = search.split("\\s+");
		HashMap<Post, Integer> map = new HashMap<>();
		int count = 0;
		
		for (String keyword : keywords) { //입력된 검색어 앞부분 7개만
			if(count == 7) {
				break;
			}
			logger.info("검색어: {}", keyword);
			List<Post> posts = postRepository.findByTitleContaining(keyword);
			for (Post post : posts) { //자주 등장하는 결과물 체크
				 map.put(post, map.getOrDefault(post, 0) + 1);
			}
			count++;
		}
		
		List<Post> posts = map.entrySet().stream() //검색어가 많은 순으로 정렬된 리스트
	            .sorted((entry1, entry2) -> entry2.getValue() - entry1.getValue()) // value 기준 내림차순 정렬
	            .map(Map.Entry::getKey) // Camping 객체만 추출
	            .collect(Collectors.toList());
        
		List<PostListDto> postListDtos = new ArrayList<>();
		for(Post post : posts) {
			postListDtos.add(PostListDto.toDto(post));
        }
		
		return postListDtos;
	}
}
