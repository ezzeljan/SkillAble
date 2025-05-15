package com.team37.skillable.Controller;

import com.team37.skillable.dto.TeacherProfileUpdateRequest;
import com.team37.skillable.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*") // Add this to allow requests from your React app
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping("/update")
    public ResponseEntity<String> updateTeacherProfile(
            @RequestBody TeacherProfileUpdateRequest request) {
        teacherService.updateTeacherProfile(request);
        return ResponseEntity.ok("Teacher profile updated successfully");
    }
}