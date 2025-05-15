package com.team37.skillable.Controller;

import com.team37.skillable.Entity.UserEntity;
import com.team37.skillable.Repository.UserRepository;
import com.team37.skillable.Service.AuthService;
import com.team37.skillable.dto.LoginRequest;
import com.team37.skillable.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow requests from any origin
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        // Find user by email
        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        // Check if user exists and password matches
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User not found");
        }

        // Verify password (in a real app, use password encoding)
        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid password");
        }

        // Generate a simple token (in a real app, use JWT)
        String token = generateSimpleToken(user.getId(), user.getEmail());

        return ResponseEntity.ok(token);
    }

    private String generateSimpleToken(int userId, String email) {
        // This is a very simple token for demonstration
        // In a real app, use JWT with proper encryption
        return "user_" + userId + "_" + System.currentTimeMillis();
    }
}