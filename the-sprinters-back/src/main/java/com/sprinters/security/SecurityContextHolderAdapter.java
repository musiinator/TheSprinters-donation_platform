package com.sprinters.security;

import com.sprinters.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;


import static java.util.Optional.ofNullable;

/**
 * Gets the authenticated User.
 */
public class SecurityContextHolderAdapter {

    public static User getCurrentLoggedInUser() throws AuthenticationException {
        return (User) ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(Authentication::getPrincipal)
                .orElseThrow(() -> new AuthenticationException("Authentication not found") {
                });
    }

}
