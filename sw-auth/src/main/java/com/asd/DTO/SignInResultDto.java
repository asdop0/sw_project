package com.asd.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignInResultDto extends SignUpResultDto {
    private String accessToken;
    private String refreshToken;
    private String role;
    @Builder
    public SignInResultDto(boolean success, int code, String msg, String accessToken, String refreshToken, String role) {
        super(success, code, msg);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.role = role; 
    }
}