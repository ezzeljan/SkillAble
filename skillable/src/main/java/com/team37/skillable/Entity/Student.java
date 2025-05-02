package com.team37.skillable.Entity;

import jakarta.persistence.*;
import java.util.List;
import lombok.Setter;
import lombok.Getter;

@Entity
@Setter
@Getter
@Table(name = "student")
public class Student extends UserEntity {
    // Remove the @Id and @GeneratedValue here

    private String firstName;
    private String lastName;
    private int age;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    // Progress tracking
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Progress> progress;
}