// filepath: src/main/java/com/team37/skillable/Repository/TeacherRepository.java
package com.team37.skillable.Repository;

import com.team37.skillable.Entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}