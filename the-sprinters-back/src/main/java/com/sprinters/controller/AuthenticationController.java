package com.sprinters.controller;

import com.sprinters.dtos.AuthenticationDto;
import com.sprinters.dtos.RegistrationDto;
import com.sprinters.dtos.UserDto;
import com.sprinters.model.User;
import com.sprinters.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthenticationController {
    private final UserService userService;

    @PostMapping(path = "/login")
    public UserDto login(@RequestBody AuthenticationDto authenticationDto) {
        return userService.login(authenticationDto);
    }

    @PostMapping(path = "/register")
    public UserDto register(@RequestBody RegistrationDto registrationDto) {
        return userService.register(registrationDto);
    }
}
