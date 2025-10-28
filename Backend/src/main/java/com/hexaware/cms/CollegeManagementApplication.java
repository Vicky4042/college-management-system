package com.hexaware.cms;

import org.springframework.lang.NonNull;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class CollegeManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(CollegeManagementApplication.class, args);
        System.out.println("🚀 College Management System Started!");
        System.out.println("📊 Access: http://localhost:8080");
        System.out.println("🏥 Health: http://localhost:8080/api/health");
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**");
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    // Add a simple root endpoint for testing
    @RestController
    public static class TestController {
        
        @GetMapping("/")
        public Map<String, String> home() {
            Map<String, String> response = new HashMap<>();
            response.put("status", "✅ Backend is running!");
            response.put("message", "Vikas's College Management System");
            response.put("health", "/api/health");
            return response;
        }
    }
}
