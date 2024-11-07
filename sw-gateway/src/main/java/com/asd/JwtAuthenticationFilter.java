package com.asd;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {
//액세스 토큰의 유효성 검사를 하는 필터
    @Value("${jwt.secret}")
    private String secretKey;

    public JwtAuthenticationFilter() {
        super(Config.class);
    }
    
    public static class Config {
        // Configuration properties (if any) can be added here.
    }
    
    private Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
    }
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String token = exchange.getRequest().getHeaders().getFirst("X-AUTH-TOKEN");
            logger.info("[filter] token 값 추출 완료. token : {}", token);
            logger.info("[doFilterInternal] token 값 유효성 체크 시작");

            if (token != null && validateToken(token)) {
                logger.info("[doFilterInternal] token 값 유효성 체크 완료");
                // JWT가 유효하면 추가로 필요한 로직을 작성할 수 있습니다.
            } else {
            	exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED); // 401 상태 코드 설정
                return exchange.getResponse().setComplete(); // 요청을 차단하고 응답을 완료
            }

            return chain.filter(exchange);
        };
    }
    
    public boolean validateToken(String token) {
        logger.info("[validateToken] 토큰 유효 체크 시작");
        try {
            Jws<Claims> claims = Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
            logger.info("[validateToken] 토큰 유효 체크 완료");
            return !claims.getPayload().getExpiration().before(new Date());
        } catch (Exception e) {
            logger.info("[validateToken] 토큰 유효 체크 예외 발생");
            return false;
        }
    }
}
