package com.sprinters.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDto {
    private String username;
    private String password;
    private String userType;
    private String logo;
}
