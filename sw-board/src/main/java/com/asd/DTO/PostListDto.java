package com.asd.DTO;

import java.time.LocalDateTime;

import com.asd.model.Post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostListDto {
	private Long id;
	private String title;
	private LocalDateTime writeDate;
	private String nickName;
	private Long count;
	
	public static PostListDto toDto(Post post) {
		return new PostListDto(
			post.getId(),
			post.getTitle(),
			post.getWriteDate(),
			post.getUser().getNickname(),
			post.getCount()
        );
	}
}
