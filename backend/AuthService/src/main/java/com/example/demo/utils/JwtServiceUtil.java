package com.example.demo.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceUtil {
	private final String secretkey = "TXlWZXJ5U2VjcmV0S2V5VGhhdE5ldmVyQ2hhbmdlczEyMzQ1Njc4OQ==";

	private SecretKey getKey() {
	    byte[] keyBytes = Decoders.BASE64.decode(secretkey);
	    return Keys.hmacShaKeyFor(keyBytes);
	}


    public String generateToken(String username, List<String>  authorities, Integer id) {
        Map<String, Object> claims = new HashMap<>();
        SecretKey key = getKey();
//	        System.out.println("in generate token");
        String token = Jwts.builder()
                .claims()
                .add(claims)
                .add("roles", authorities)
                .add("userId", id)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 60 * 60 * 3000))
                .and()
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        return token;
    }

   

    public String extractUserName(String token) {
        // extract the username from jwt token
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}
