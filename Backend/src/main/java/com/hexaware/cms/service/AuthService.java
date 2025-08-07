package com.hexaware.cms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hexaware.cms.model.User;
import com.hexaware.cms.model.Role;
import com.hexaware.cms.repository.UserRepository;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    // Register a new user
    public User registerUser(String email, String password) {
        // Generate name from email
        String name = email.split("@")[0].replace(".", " ").replace("_", " ");
        name = capitalizeWords(name);
        
        User user = new User(email, password, name, Role.STUDENT);
        return userRepository.save(user);
    }
    
    // Authenticate user login
    public User authenticateUser(String email, String password) {
        return userRepository.findByEmail(email)
            .filter(user -> user.getPassword().equals(password))
            .orElse(null);
    }
    
    // Check if user exists by email
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    // Helper method to capitalize words
    private String capitalizeWords(String text) {
        String[] words = text.split(" ");
        StringBuilder result = new StringBuilder();
        
        for (String word : words) {
            if (word.length() > 0) {
                result.append(Character.toUpperCase(word.charAt(0)))
                      .append(word.substring(1).toLowerCase())
                      .append(" ");
            }
        }
        
        return result.toString().trim();
    }
}
