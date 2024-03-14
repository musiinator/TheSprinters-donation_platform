package com.sprinters.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "charity_case")
@Entity
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class CharityCase extends BaseEntity {
    private String familyName;
    private String familyImage;
    private int nrChildren;
    private int nrBoys;
    private int nrGirls;
    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;
    private String city;
    private String county;
    private String country;
    @OneToMany(mappedBy = "charityCase", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Person> persons;
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private List<String> needs;
}
