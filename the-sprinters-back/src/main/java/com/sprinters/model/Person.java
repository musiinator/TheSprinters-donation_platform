package com.sprinters.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sprinters.enums.Gender;
import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Person extends BaseEntity{
    private String firstName;
    private String lastName;
    private String age;
    private String description;
    private boolean isChild;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @ManyToOne
    @JoinColumn(name = "charity_case_id")
    @JsonBackReference
    private CharityCase charityCase;
}
