package com.sprinters.security;

import com.sprinters.model.User;
import com.sprinters.model.UserType;
import com.sprinters.repository.UserRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.Charset;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static io.jsonwebtoken.SignatureAlgorithm.HS256;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenProvider {
    static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserRepository userRepository;
    @Value("${security.jwt.token.secret-key}")
    private String secretKey;
    @Value("${security.jwt.token.expire-length}")
    private long validityInMilliseconds;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(Charset.defaultCharset()));
    }

    public String createToken(final String username, final UserType role) {
        final Claims claims = Jwts.claims().setSubject(username);
        final Date now = new Date();
        final Date validity = new Date(now.getTime() + validityInMilliseconds);

        claims.put("auth", Collections.singletonList(new SimpleGrantedAuthority(role.getAuthority())));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(HS256, secretKey)
                .compact();
    }

    Authentication getAuthentication(final String token) {
        final String userName = getUsername(token);
        final User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new RuntimeException("User not found"));

        final List<GrantedAuthority> authorities = Collections.singletonList(user.getUserType());

        return new UsernamePasswordAuthenticationToken(user, "", authorities);
    }

    public String getUsername(final String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    String resolveToken(final HttpServletRequest req) {
        final String bearerToken = req.getHeader(AUTHORIZATION_HEADER);

        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    boolean validateToken(final String authToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
            return true;
        } catch (final SignatureException | MalformedJwtException |
                       UnsupportedJwtException | IllegalArgumentException ex) {
            log.error("Invalid JWT token", ex);
        } catch (ExpiredJwtException ex) {
            // do not care about this exception
        }

        return false;
    }
}
