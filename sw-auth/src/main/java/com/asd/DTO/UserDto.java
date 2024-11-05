package com.asd.DTO;

import com.asd.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
	private String name;
	private String nickname;
	
	public static UserDto toDto(User user) {
        return new UserDto(
    		user.getName(),
    		user.getNickname()
        );
    }
}
