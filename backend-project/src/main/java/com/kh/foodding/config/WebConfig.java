package com.kh.foodding.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

<<<<<<< HEAD
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
	    // 💡 서비스의 저장 경로 "C:/foodding/uploads/"와 반드시 일치해야 함!
	    registry.addResourceHandler("/uploads/**")
	            .addResourceLocations("file:///C:/foodding/uploads/")
	            .setCacheControl(CacheControl.noCache()); // 캐시 무력화 (즉시 반영됨)
	}

    // React(5173)와의 통신을 위한 CORS 설정
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS")
=======
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 실제 이미지가 저장된 경로 (로컬 프로젝트 폴더 기준 경로 포함)
        Path projectUploads = Paths.get(System.getProperty("user.dir"), "uploads")
                                   .toAbsolutePath();

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(
                        projectUploads.toUri().toString(),
                        "file:/C:/foodding/uploads/"
                );
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("http://localhost:5173") // ⭐ 핵심
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
>>>>>>> b21c34a0f086799c3e56286fd412f90bd76873c4
                .allowCredentials(true);
    }
}