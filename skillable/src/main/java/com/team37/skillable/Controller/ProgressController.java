package com.team37.skillable.Controller;

import com.team37.skillable.Entity.Progress;
import com.team37.skillable.Repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressRepository progressRepository;

    @GetMapping
    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Progress> getProgressById(@PathVariable Long id) {
        return progressRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Progress createProgress(@RequestBody Progress progress) {
        return progressRepository.save(progress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Progress> updateProgress(@PathVariable Long id, @RequestBody Progress updatedProgress) {
        return progressRepository.findById(id).map(progress -> {
            progress.setScore(updatedProgress.getScore());
            progress.setDateCompleted(updatedProgress.getDateCompleted());
            return ResponseEntity.ok(progressRepository.save(progress));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgress(@PathVariable Long id) {
        if (!progressRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        progressRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
