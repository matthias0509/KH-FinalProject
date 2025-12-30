package com.kh.foodding.config;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final List<String> uploadLocations = new ArrayList<>();

    public WebConfig() {
        // 1. 기존 코드 (프로젝트 내부 uploads) - 건드리지 않음
        Path projectUploads = Paths.get(System.getProperty("user.dir"), "uploads");
        ensureDirectory(projectUploads);
        uploadLocations.add(projectUploads.toUri().toString());

        // 2. 기존 코드 (C:/foodding/uploads) - 건드리지 않음
        Path windowsUploads = Paths.get("C:/foodding/uploads");
        uploadLocations.add(windowsUploads.toUri().toString());
        
        // 🚨 [여기만 추가하세요!] 실제 파일이 있는 'profile_images' 폴더를 리스트에 추가
        Path profileUploads = Paths.get("C:/foodding/profile_images"); 
        uploadLocations.add(profileUploads.toUri().toString());
    }

    // ... 아래 ensureDirectory랑 addResourceHandlers는 그대로 두세요 ...
    private void ensureDirectory(Path dir) {
        try {
            Files.createDirectories(dir);
        } catch (Exception ignored) {
        }
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        ResourceHandlerRegistration registration = registry.addResourceHandler("/uploads/**");
        uploadLocations.stream()
            .distinct()
            .forEach(location -> registration.addResourceLocations(location.endsWith("/") ? location : location + "/"));
    }
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
        		.allowedOriginPatterns("*")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}