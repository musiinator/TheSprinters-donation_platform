package com.sprinters.dtos;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sprinters.model.Organization;
import com.sprinters.model.Person;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CharityCaseDto {
    private String familyName;
    private String familyImage;
    private int nrChildren;
    private int nrBoys;
    private int nrGirls;
    private Organization organization;
    private String city;
    private String county;
    private String country;
    private List<Person> persons;
    private List<String> needs;
}
