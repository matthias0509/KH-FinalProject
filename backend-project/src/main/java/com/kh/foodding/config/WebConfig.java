package com.kh.foodding.config;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
	    String userDir = System.getProperty("user.dir");
	    List<String> locations = new ArrayList<>();

	    Path repoUploads = Paths.get(userDir, "uploads").toAbsolutePath();
	    locations.add(repoUploads.toUri().toString());

	    Path backendUploads = Paths.get(userDir, "backend-project", "uploads").toAbsolutePath();
	    locations.add(backendUploads.toUri().toString());

	    locations.add("file:///C:/foodding/uploads/");

	    registry.addResourceHandler("/uploads/**")
	            .addResourceLocations(locations.toArray(new String[0]))
	            .setCacheControl(CacheControl.noCache());
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
