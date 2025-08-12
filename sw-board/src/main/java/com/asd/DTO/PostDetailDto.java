package com.asd.DTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.asd.model.Post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDetailDto {
	private Long id;
	private String title;
	private String content;
	private LocalDateTime writeDate;
	private String userName;
	private Long count;
	private List<CommentDto> comments;
	
	public static PostDetailDto toDto(Post post) {
        List<CommentDto> commentDtos = post.getComments().stream()
                .map(CommentDto::toDto)
                .collect(Collectors.toList());
        
        return new PostDetailDto(
        	post.getId(),
        	post.getTitle(),
        	post.getContent(),
        	post.getWriteDate(),
        	post.getUser().getName(),
        	post.getCount(),
            commentDtos
        );
    }
}
