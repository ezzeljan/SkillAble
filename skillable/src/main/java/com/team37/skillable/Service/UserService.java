package com.team37.skillable.Service;

import com.team37.skillable.Entity.Student;
import com.team37.skillable.Entity.Teacher;
import com.team37.skillable.Entity.UserEntity;
import com.team37.skillable.Repository.StudentRepository;
import com.team37.skillable.Repository.TeacherRepository;
import com.team37.skillable.Repository.UserRepository;
import com.team37.skillable.dto.UserProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    public UserProfileResponse getUserProfile(String email) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        UserEntity user = userOpt.get();
        UserProfileResponse response = new UserProfileResponse();
        response.setEmail(user.getEmail());

        // Check if the user is a student
        Optional<Student> studentOpt = studentRepository.findByEmail(email);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            response.setUserType("STUDENT");
            response.setFirstName(student.getFirstName());
            response.setLastName(student.getLastName());
            response.setAge(student.getAge());
            return response;
        }

        // Check if the user is a teacher
        Optional<Teacher> teacherOpt = teacherRepository.findByEmail(email);
        if (teacherOpt.isPresent()) {
            Teacher teacher = teacherOpt.get();
            response.setUserType("TEACHER");
            response.setName(teacher.getName());
            return response;
        }

        // Default user type
        response.setUserType("USER");
        return response;
    }
    public void deleteUserByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Delete student or teacher record if exists
        if (user instanceof Student) {
            studentRepository.delete((Student) user);
        } else if (user instanceof Teacher) {
            teacherRepository.delete((Teacher) user);
        }

        // Delete the user entity
        userRepository.delete(user);
    }
}