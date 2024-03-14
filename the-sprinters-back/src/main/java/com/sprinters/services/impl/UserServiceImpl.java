package com.sprinters.services.impl;

import com.sprinters.dtos.AuthenticationDto;
import com.sprinters.dtos.RegistrationDto;
import com.sprinters.dtos.UserDto;
import com.sprinters.model.Organization;
import com.sprinters.model.User;
import com.sprinters.model.UserType;
import com.sprinters.repository.OrganizationRepository;
import com.sprinters.repository.UserRepository;
import com.sprinters.security.JwtTokenProvider;
import com.sprinters.services.UserService;
import com.sprinters.utils.UserValidator;
import com.sprinters.utils.exceptions.AlreadyExistsException;
import com.sprinters.utils.exceptions.BadInputException;
import com.sprinters.utils.exceptions.NotFoundException;
import com.sprinters.utils.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserValidator userValidator;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final OrganizationRepository organizationRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public UserDto login(AuthenticationDto authenticationDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationDto.getUsername(), authenticationDto.getPassword()));
        User user = userRepository.findByUsername(authenticationDto.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        final String jwtToken = jwtTokenProvider.createToken(authenticationDto.getUsername(), user.getUserType());

        return userMapper.entityToDto(user, jwtToken);
    }

    @Override
    public UserDto register(RegistrationDto registrationDto) {
        if (!userValidator.validateUsername(registrationDto.getUsername())) {
            throw new BadInputException("Invalid username");
        }
        if (!userValidator.validatePassword(registrationDto.getPassword())) {
            throw new BadInputException("Invalid password");
        }

        if (Objects.equals(UserType.valueOf(registrationDto.getUserType()), UserType.ORGANIZATION)) {
            organizationRepository.findByName(registrationDto.getUsername())
                    .ifPresent(organization -> {
                        throw new AlreadyExistsException("Organization already exists");
                    });
            Organization organization = Organization.builder()
                    .name(registrationDto.getUsername())
                    .description("Description")
                    .domain("Domain")
                    .email("Email")
                    .location("Location")
                    .logo(registrationDto.getLogo())
                    .build();

            organizationRepository.save(organization);

        }

        userRepository.findByUsername(registrationDto.getUsername())
                .ifPresent(user -> {
                    throw new AlreadyExistsException("Username already exists");
                });
        User user = User.builder()
                .userType(UserType.valueOf(registrationDto.getUserType()))
                .username(registrationDto.getUsername())
                .password(new BCryptPasswordEncoder().encode(registrationDto.getPassword()))
                .build();

        userRepository.save(user);
        final String jwtToken = jwtTokenProvider.createToken(user.getUsername(), user.getUserType());

        return userMapper.entityToDto(user, jwtToken);
    }

    @Override
    public UserDto updateUser(UserDto userDto, UUID userId) {
        userValidator.validateUserData(userDto);

        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());

        userRepository.save(user);
        return userMapper.entityToDto(user, null);
    }

}
