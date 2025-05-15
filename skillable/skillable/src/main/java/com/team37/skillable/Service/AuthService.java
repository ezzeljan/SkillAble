package com.team37.skillable.Service;

import com.team37.skillable.Entity.Student;
import com.team37.skillable.Entity.Teacher;
import com.team37.skillable.Entity.UserEntity;
import com.team37.skillable.Repository.StudentRepository;
import com.team37.skillable.Repository.TeacherRepository;
import com.team37.skillable.Repository.UserRepository;
import com.team37.skillable.dto.LoginRequest;
import com.team37.skillable.dto.RegisterRequest;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists.";
        }

        if ("teacher".equalsIgnoreCase(request.getUserType())) {
            Teacher teacher = new Teacher();
            teacher.setEmail(request.getEmail());
            teacher.setPassword(request.getPassword());
            teacher.setName(request.getName());
            teacherRepository.save(teacher);
            return "Teacher registered successfully!";
        } else if ("student".equalsIgnoreCase(request.getUserType())) {
            Student student = new Student();
            student.setEmail(request.getEmail());
            student.setPassword(request.getPassword());
            student.setFirstName(request.getFirstName());
            student.setLastName(request.getLastName());
            student.setAge(request.getAge());
            studentRepository.save(student);
            return "Student registered successfully!";
        } else {
            return "Invalid user type.";
        }
    }

    public String login(LoginRequest request) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            if (user.getPassword().equals(request.getPassword())) {
                return "Login successful! Welcome, " + user.getEmail();
            }
        }
        return "Invalid email or password.";
    }
}
