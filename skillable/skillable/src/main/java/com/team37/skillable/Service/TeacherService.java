package com.team37.skillable.Service;

import com.team37.skillable.Entity.Teacher;
import com.team37.skillable.Repository.TeacherRepository;
import com.team37.skillable.dto.TeacherProfileUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    public void updateTeacherProfile(TeacherProfileUpdateRequest request) {
        Optional<Teacher> teacherOpt = teacherRepository.findByEmail(request.getEmail());

        if (teacherOpt.isEmpty()) {
            throw new RuntimeException("Teacher not found");
        }

        Teacher teacher = teacherOpt.get();
        teacher.setName(request.getName());

        teacherRepository.save(teacher);
    }

    // Add this method to retrieve all teachers
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }
}