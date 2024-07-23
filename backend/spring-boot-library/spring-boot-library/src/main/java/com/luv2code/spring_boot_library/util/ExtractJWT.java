package com.luv2code.spring_boot_library.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class ExtractJWT {

    // Secret key used for signing and verifying the JWT. 
    // This should match the key used to generate the token.
    private static final String SECRET_KEY = "your-secret-key"; // Replace with your actual secret key

    public static String payloadJWTExtraction(String token, String extractionField) {
        try {
            byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(keyBytes))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get(extractionField, String.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract JWT payload", e);
        }
    }
}
