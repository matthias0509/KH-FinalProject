package com.kh.foodding.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

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
                .allowCredentials(true);
    }
}