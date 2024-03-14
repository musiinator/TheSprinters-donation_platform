package com.sprinters.services;

import com.sprinters.dtos.AuthenticationDto;
import com.sprinters.dtos.RegistrationDto;
import com.sprinters.dtos.UserDto;

import java.util.UUID;

public interface UserService {
    UserDto login(AuthenticationDto authenticationDto);
    UserDto register(RegistrationDto registrationDto);
    UserDto updateUser(UserDto userDto, UUID userId);
}
