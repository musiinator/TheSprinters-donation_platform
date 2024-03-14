package com.sprinters.utils;

import com.sprinters.dtos.UserDto;
import com.sprinters.model.User;
import com.sprinters.utils.exceptions.BadInputException;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserValidator{
    private static final String NAME_REGEX = "^[a-zA-Z\\s]{1,50}$";
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,50}$";
    private static final String USERNAME_REGEX = "^[a-zA-Z0-9]{1,20}$";
    private static final String PASSWORD_REGEX = "^[a-zA-Z0-9]{1,20}$";


    public void validateUserData(UserDto user) {
        if (!user.getFirstName().matches(NAME_REGEX)) {
            throw new BadInputException("Invalid first name");
        }

        if (!user.getLastName().matches(NAME_REGEX)) {
            throw new BadInputException("Invalid last name");
        }

        if (!user.getEmail().matches(EMAIL_REGEX)) {
            throw new BadInputException("Invalid email");
        }
    }

    public boolean validateUsername(String username) {
        return username.matches(USERNAME_REGEX);
    }

    public boolean validatePassword(String password) {
        return password.matches(PASSWORD_REGEX);
    }
}
