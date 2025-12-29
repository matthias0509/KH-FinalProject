package com.kh.foodding.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 💡 브라우저 URL 요청: http://localhost:8001/foodding/uploads/파일명.png
        // 👉 실제 파일 위치: D:/foodding/profile_images/파일명.png
        
        registry.addResourceHandler("/uploads/**") // 이 주소 패턴으로 요청이 오면
                .addResourceLocations("file:///c:/foodding/profile_images/"); // 여기서 파일을 찾는다.
    }
}