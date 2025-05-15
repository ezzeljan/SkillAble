package com.team37.skillable.util;

import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    public boolean isAdminUser(String token) {
        // In a real application, you would validate the token
        // and check if the user has admin privileges
        // This is just a placeholder implementation
        return token != null && token.contains("admin");
    }
}