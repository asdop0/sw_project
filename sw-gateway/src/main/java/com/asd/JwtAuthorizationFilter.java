package com.asd;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtAuthorizationFilter extends AbstractGatewayFilterFactory<JwtAuthorizationFilter.Config> {
//관리자 권한을 검사하는 필터
	@Value("${jwt.secret}")
    private String secretKey;
	
	public JwtAuthorizationFilter() {
		super(Config.class);
	}
	
	public static class Config {
        // Configuration properties (if any) can be added here.
    }
	
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
    }
    
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    @SuppressWarnings("unchecked")
    public List<String> extractRolesFromToken(String token) {
        return (List<String>) Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("roles");
    }
	
    
    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            // 헤더에서 JWT 추출
            String token = exchange.getRequest().getHeaders().getFirst("X-AUTH-TOKEN");
            
            // JWT에서 권한 정보 추출 및 권한 검증
            List<String> roles = extractRolesFromToken(token);
            if (roles.contains("ROLE_ADMIN")) {
                // 사용자가 관리자인 경우 필터 체인 계속 진행
                return chain.filter(exchange);
            } else {
                // 권한이 없는 경우 403 상태 코드 반환
                exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                return exchange.getResponse().setComplete();
            }
        };
    }
}
