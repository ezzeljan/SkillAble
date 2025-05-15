package com.team37.skillable.Controller;

import com.team37.skillable.dto.StudentProfileUpdateRequest;
import com.team37.skillable.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/update")
    public ResponseEntity<String> updateStudentProfile(
            @RequestBody StudentProfileUpdateRequest request) {
        studentService.updateStudentProfile(request);
        return ResponseEntity.ok("Student profile updated successfully");
    }
}