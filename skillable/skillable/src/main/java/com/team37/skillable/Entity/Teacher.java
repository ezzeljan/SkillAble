package com.team37.skillable.Entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "teacher")
public class Teacher extends UserEntity {
    private String name;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
    private List<Student> students = new ArrayList<>();
}