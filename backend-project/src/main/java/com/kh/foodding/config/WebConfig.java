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

import com.kh.foodding.common.FileStorageUtils;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final List<String> uploadLocations = new ArrayList<>();

    public WebConfig() {
        // 1. 기존 코드 (프로젝트 내부 uploads) - 건드리지 않음
        Path projectUploads = Paths.get(System.getProperty("user.dir"), "uploads");
        ensureDirectory(projectUploads);
        uploadLocations.add(projectUploads.toUri().toString());

        // 2. OS에 관계없이 사용자 디렉터리 하위 저장소 사용
        Path storageUploads = FileStorageUtils.getUploadsDir();
        uploadLocations.add(storageUploads.toUri().toString());

        // Ensure the nested profile-images directory exists inside uploads
        FileStorageUtils.getProfileImagesDir();
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
