package com.sprinters.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "organization")
@Entity
public class Organization extends BaseEntity {
    private String name;
    private String domain;
    private String description;
    private String location;
    private String email;
    private String logo;
}
