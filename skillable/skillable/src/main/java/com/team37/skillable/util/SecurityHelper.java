package com.team37.skillable.util;

import com.team37.skillable.Entity.UserEntity;
import com.team37.skillable.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SecurityHelper {

    @Autowired
    private UserRepository userRepository;

    // Extract user ID from token (simplified for example)
    public int getUserIdFromToken(String token) {
        // In a real application, you would decode and validate the JWT token
        // This is a simplified example
        if (token == null || !token.startsWith("user_")) {
            return -1;
        }

        try {
            String[] parts = token.split("_");
            return Integer.parseInt(parts[1]);
        } catch (Exception e) {
            return -1;
        }
    }

    // Check if a user has admin privileges
    public boolean isAdmin(String token) {
        int userId = getUserIdFromToken(token);
        if (userId < 0) {
            return false;
        }

        Optional<UserEntity> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return false;
        }

        UserEntity user = userOpt.get();
        // Add your admin checking logic here
        // For example, check a specific email domain or user role
        return user.getEmail().endsWith("@admin.skillable.com");
    }
}