package com.team37.skillable.Repository;

import com.team37.skillable.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	Optional<UserEntity> findByEmail(String email);

	// Custom query to find users who are not teachers
	// This query depends on your inheritance strategy in UserEntity
	@Query("SELECT u FROM UserEntity u WHERE TYPE(u) <> Teacher")
	List<UserEntity> findAllNonTeachers();

	// Alternative approach if the above doesn't work with your inheritance setup
	@Query("SELECT u FROM UserEntity u WHERE u.email NOT IN (SELECT t.email FROM Teacher t)")
	List<UserEntity> findUsersNotInTeachers();
}