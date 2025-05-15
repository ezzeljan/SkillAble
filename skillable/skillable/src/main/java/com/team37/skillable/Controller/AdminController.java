package com.team37.skillable.Controller;

import com.team37.skillable.Entity.Teacher;
import com.team37.skillable.Entity.UserEntity;
import com.team37.skillable.Service.TeacherService;
import com.team37.skillable.Service.UserService;
import com.team37.skillable.dto.PromoteToTeacherRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private TeacherService teacherService;

    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users/non-teachers")
    public ResponseEntity<List<UserEntity>> getNonTeacherUsers() {
        return ResponseEntity.ok(userService.getNonTeacherUsers());
    }

    @PostMapping("/promote-to-teacher")
    public ResponseEntity<String> promoteToTeacher(@RequestBody PromoteToTeacherRequest request) {
        String result = userService.promoteToTeacher(request);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/teachers")
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        // Use the service method instead of directly accessing the repository
        List<Teacher> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkAdminStatus(@RequestParam String email) {
        boolean isAdmin = userService.isAdmin(email);
        return ResponseEntity.ok(isAdmin);
    }
}