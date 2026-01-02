	package com.kh.foodding.config;
	
	import java.nio.charset.StandardCharsets;
	import java.security.Key;
	
	import org.springframework.stereotype.Component;
	
	import io.jsonwebtoken.Claims;
	import io.jsonwebtoken.Jwts;
	import io.jsonwebtoken.security.Keys;
	
	@Component
	public class JWTUtil {
		
		private final String SECRET_KEY = "Hello123KHAcademy456Dangsan789WelcomeToEClass";
		private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
	
	    // 💡 토큰에서 userNo 추출 (에러 로그에서 찾던 바로 그 메서드)
	    public int extractUserNo(String token) {
	        Claims claims = Jwts.parserBuilder()
	                .setSigningKey(key)
	                .build()
	                .parseClaimsJws(token)
	                .getBody();
	
	        // 토큰 생성 시 "userNo"라는 이름으로 저장했다면 아래와 같이 추출
	        return Integer.parseInt(claims.get("userNo").toString());
	    }
	    
	    public String extractUserRole(String token) {
	        Claims claims = Jwts.parserBuilder()
	                .setSigningKey(key)
	                .build()
	                .parseClaimsJws(token)
	                .getBody();
	                
	        // 💡 로그인 시 claim("role", ...)으로 넣었던 값을 꺼냅니다.
	        return claims.get("role", String.class); 
	    }
	 // ⭐ [추가됨 1] 토큰에서 userId(아이디) 꺼내기 (로그인할 때 setSubject로 넣은 값)
	    public String extractUserId(String token) {
	        return Jwts.parserBuilder()
	                .setSigningKey(key)
	                .build()
	                .parseClaimsJws(token)
	                .getBody()
	                .getSubject();
	    }
	
	    // ⭐ [추가됨 2] 토큰이 유효한지 검사 (만료됐거나 위조됐으면 false 반환)
	    public boolean validateToken(String token) {
	        try {
	            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
	            return true;
	        } catch (Exception e) {
	            return false;
	        }
	    }
	
	}
