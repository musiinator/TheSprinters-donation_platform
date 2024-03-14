package com.sprinters.security;

import com.sprinters.model.User;
import com.sprinters.model.UserType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collection;

@RequiredArgsConstructor
public class JwtTokenFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
        try {
            final String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
            if (token != null && jwtTokenProvider.validateToken(token)) {
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                User user = (User) authentication.getPrincipal();
                String role = null;
                Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
                for (GrantedAuthority authority : authorities) {
                    role = authority.getAuthority();
                }
                String newToken = jwtTokenProvider.createToken(user.getUsername(), UserType.valueOf(role));
                HttpServletResponse httpServletResponse = (HttpServletResponse) response;
                httpServletResponse.setHeader("Authorization", "Bearer" + newToken);
                httpServletResponse.setHeader("Access-Control-Expose-Headers", "Authorization");
            }

            chain.doFilter(request, response);
        } catch (Exception e) {
            SecurityContextHolder.clearContext();
            ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
