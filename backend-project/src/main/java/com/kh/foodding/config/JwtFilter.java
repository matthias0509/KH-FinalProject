package com.kh.foodding.config;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            if (jwtUtil.validateToken(token)) {
                String userId = jwtUtil.extractUserId(token);
                System.out.println("✅ 토큰 유효함! 사용자 ID: " + userId);

                // 🚨 [수정된 부분] 
                // 기존: if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null)
                // 변경: 뒤에 getAuthentication() == null 조건을 지워버립니다. (강제 덮어쓰기)
                if (userId != null) {
                    
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userId, null, List.of(new SimpleGrantedAuthority("ROLE_USER")));

                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    
                    // 명부에 이름 적기
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    
                    // 🔍 [확인용 로그] 이 로그가 뜨면 게임 끝입니다.
                    System.out.println("👮‍♂️ SecurityContext에 '" + userId + "' 등록 완료!");
                }
            } else {
                 System.out.println("❌ 토큰 유효하지 않음");
            }
        }

        filterChain.doFilter(request, response);
    }
}