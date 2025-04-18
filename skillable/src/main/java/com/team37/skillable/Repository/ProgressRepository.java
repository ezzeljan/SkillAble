// filepath: src/main/java/com/team37/skillable/Repository/ProgressRepository.java
package com.team37.skillable.Repository;

import com.team37.skillable.Entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
}
