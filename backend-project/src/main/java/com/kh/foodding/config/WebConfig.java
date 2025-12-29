package com.kh.foodding.config;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final List<String> uploadLocations = new ArrayList<>();

    public WebConfig() {
        // 프로젝트 실행 경로(예: backend 프로젝트 루트) 기준
        Path projectUploads = Paths.get(System.getProperty("user.dir"), "uploads");
        ensureDirectory(projectUploads);
        uploadLocations.add(projectUploads.toUri().toString());

        // 기존 윈도우 배포 경로도 유지 (있을 경우)
        Path windowsUploads = Paths.get("C:/foodding/uploads");
        uploadLocations.add(windowsUploads.toUri().toString());
    }

    private void ensureDirectory(Path dir) {
        try {
            Files.createDirectories(dir);
        } catch (Exception ignored) {
            // 디렉터리 생성 실패해도 다른 경로를 사용하도록 무시
        }
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        ResourceHandlerRegistration registration = registry.addResourceHandler("/uploads/**");
        uploadLocations.stream()
            .distinct()
            .forEach(location -> registration.addResourceLocations(location.endsWith("/") ? location : location + "/"));
    }

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOriginPatterns("http://localhost:5173") // ⭐ 핵심
//                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(true);
//    }
}
