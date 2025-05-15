package com.team37.skillable.Controller;

import com.team37.skillable.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "*")
public class AdminAuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/check")
    // Change this to accept an email parameter (String) instead of userId (int)
    public ResponseEntity<Boolean> checkAdminStatus(@RequestParam String email) {
        boolean isAdmin = userService.isAdmin(email);
        return ResponseEntity.ok(isAdmin);
    }
}