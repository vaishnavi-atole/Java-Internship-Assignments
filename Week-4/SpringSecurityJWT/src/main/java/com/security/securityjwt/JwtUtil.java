package com.security.securityjwt;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

/**
 * Utility class for generating and validating JWT tokens.
 */
@Component
public class JwtUtil {

    /**
     * Secret key used to sign JWT.
     * Must be at least 32 characters for HS256.
     */
    private static final String SECRET_KEY =
            "mysecretkeymysecretkeymysecretkey12345";

    /**
     * Token validity = 1 hour.
     */
    private static final long EXPIRATION_TIME =
            1000 * 60 * 60;

    private final Key key =
            Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    /**
     * Generate JWT token.
     */
    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis()
                                + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract username from token.
     */
    public String extractUsername(String token) {

        return extractClaims(token).getSubject();
    }

    /**
     * Validate token.
     */
    public boolean validateToken(
            String token,
            String username) {

        String extractedUsername =
                extractUsername(token);

        return extractedUsername.equals(username)
                && !isTokenExpired(token);
    }

    /**
     * Check token expiration.
     */
    private boolean isTokenExpired(String token) {

        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }

    /**
     * Extract all claims.
     */
    private Claims extractClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
