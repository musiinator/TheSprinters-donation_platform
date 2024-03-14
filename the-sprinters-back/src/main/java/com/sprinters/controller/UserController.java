package com.sprinters.controller;

import com.sprinters.dtos.AuthenticationDto;
import com.sprinters.dtos.RegistrationDto;
import com.sprinters.dtos.UserDto;
import com.sprinters.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "/user")
public class UserController {
    private final UserService userService;

    @PutMapping(path = "/{userId}")
    public UserDto updateUser(@RequestBody UserDto authenticationDto, @PathVariable String userId) {
        return userService.updateUser(authenticationDto, UUID.fromString(userId));
    }
}
