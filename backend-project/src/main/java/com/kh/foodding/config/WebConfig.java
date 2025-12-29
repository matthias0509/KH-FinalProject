package com.kh.foodding.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

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
                .allowCredentials(true);
    }
}
