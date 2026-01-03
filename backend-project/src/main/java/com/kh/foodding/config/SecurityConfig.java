package com.kh.foodding.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // 👈 추가 필요
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    // 🚨 핵심 1: JwtFilter 주입 (이게 있어야 토큰 검사를 합니다)
    private final JwtFilter jwtFilter; 

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) 
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) 
            .authorizeHttpRequests(auth -> auth
                // 1. Preflight 요청 허용
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                
                // 2. 누구나 접근 가능한 경로 (로그인, 회원가입, 이미지 등)
                .requestMatchers("/foodding/uploads/**").permitAll()
                .requestMatchers("/foodding/login", "/foodding/member/insert", "/foodding/findId/**").permitAll()
                
                // 👑 3. [관리자] 전용 API 잠금 (가장 중요!)
                // /api/admin/ 으로 시작하는 모든 요청은 'ADMIN' 권한이 있어야 함
                .requestMatchers("/foodding/api/admin/**").hasAuthority("ADMIN")
                
                // 🏭 4. [메이커] 전용 API 잠금
                .requestMatchers("/foodding/api/maker/**").hasAuthority("MAKER")

                // 👤 5. [회원] 로그인 필수 API (마이페이지, 결제 등)
                // authenticated(): 권한 상관없이 로그인만 되어 있으면 OK
                .requestMatchers("/foodding/api/my/**", "/foodding/api/payment/**").authenticated()
                
                // 6. 나머지 요청은 일단 허용 (개발 완료 후 .authenticated()로 잠그는 것 추천)
                .anyRequest().permitAll()
            )
            // 🚨 핵심 2: 필터 배치 (ID/PW 검사 전에 JWT 필터가 먼저 돌도록 설정)
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            
            .httpBasic(basic -> basic.disable())
            .formLogin(form -> form.disable());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowedOriginPatterns(List.of(
            "http://localhost:5173", 
            "http://localhost:3000"
        ));
        
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public BCryptPasswordEncoder bcryptPasswordEncoder() {
        return new BCryptPasswordEncoder();    
    }
}