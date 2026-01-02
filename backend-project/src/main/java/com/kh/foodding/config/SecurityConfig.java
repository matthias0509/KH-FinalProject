package com.kh.foodding.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // CSRF 비활성화 (JWT 사용 시 필수)
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // 1. CORS 설정 연결
            .authorizeHttpRequests(auth -> auth
                // 2. Preflight(OPTIONS) 요청은 무조건 허용 (CORS 필수)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                
                // 3. 정적 리소스 및 API 경로 허용
                .requestMatchers("/uploads/**").permitAll()      // 이미지 업로드 경로
                .requestMatchers("/api/payment/**").permitAll()  // 결제 관련
                .requestMatchers("/api/**").permitAll()          // 일반 API
                .requestMatchers("/admin/**").permitAll()        // 🚨 관리자 대시보드 경로 추가
                
                // 그 외 모든 요청 허용 (개발 중 편의를 위해)
                .anyRequest().permitAll()
            )
            .httpBasic(basic -> basic.disable())
            .formLogin(form -> form.disable());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        
        // 4. 프론트엔드 주소 허용 (포트 번호 5173, 3000 등)
        // setAllowedOrigins 대신 setAllowedOriginPatterns 사용 (Credentials 허용 시 권장)
        config.setAllowedOriginPatterns(List.of(
            "http://localhost:5173", 
            "http://localhost:3000"
        ));
        
        // 허용할 HTTP 메서드
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        
        // 모든 헤더 허용
        config.setAllowedHeaders(List.of("*"));
        
        // 인증 정보(쿠키/토큰/세션) 포함 허용
        config.setAllowCredentials(true);
        
        // Preflight 요청 캐시 시간 (1시간)
        config.setMaxAge(3600L);

        // 모든 경로에 대해 위 설정 적용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public BCryptPasswordEncoder bcryptPasswordEncoder() {
        return new BCryptPasswordEncoder();    
    }
}