package com.hexaware.cms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {
    

     @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> userData) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> user = new HashMap<>();
        
        user.put("id", "1");
        user.put("email", userData.get("email"));
        user.put("name", userData.get("name"));
        
        response.put("user", user);
        response.put("token", "test-jwt-token-" + System.currentTimeMillis());
        
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        // Removed unused password variable - TODO: Implement proper authentication
        
        // Simple test authentication
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> user = new HashMap<>();
        
        user.put("id", "1");
        user.put("email", email);
        user.put("name", "Vikas V");
        
        response.put("user", user);
        response.put("token", "test-jwt-token-" + System.currentTimeMillis());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser() {
        Map<String, Object> user = new HashMap<>();
        user.put("id", "1");
        user.put("email", "vikas9036vicky@gmail.com");
        user.put("name", "Vikas V");
        
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }
    
}
