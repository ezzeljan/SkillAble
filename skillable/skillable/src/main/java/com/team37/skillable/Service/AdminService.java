package com.team37.skillable.Service;

import com.team37.skillable.Entity.Teacher;
import com.team37.skillable.Entity.UserEntity;
import com.team37.skillable.Repository.TeacherRepository;
import com.team37.skillable.Repository.UserRepository;
import com.team37.skillable.dto.PromoteToTeacherRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // Get users who are not teachers
    public List<UserEntity> getNonTeacherUsers() {
        List<UserEntity> allUsers = userRepository.findAll();
        return allUsers.stream()
                .filter(user -> !(user instanceof Teacher))
                .collect(Collectors.toList());
    }

    @Transactional
    public String promoteToTeacher(PromoteToTeacherRequest request) {
        Optional<UserEntity> userOpt = userRepository.findById(request.getUserId());

        if (userOpt.isEmpty()) {
            return "User not found";
        }

        UserEntity user = userOpt.get();

        // Check if the user is already a teacher
        if (user instanceof Teacher) {
            return "User is already a teacher";
        }

        // Create a new Teacher entity
        Teacher teacher = new Teacher();
        teacher.setId(user.getId());
        teacher.setEmail(user.getEmail());
        teacher.setPassword(user.getPassword());
        teacher.setCreatedAt(user.getCreatedAt());
        teacher.setUpdatedAt(LocalDateTime.now());
        teacher.setName(request.getName());

        // Save the teacher entity
        teacherRepository.save(teacher);

        return "User successfully promoted to teacher";
    }
}