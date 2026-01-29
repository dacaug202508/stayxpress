//package com.example.demo.utils;
//
//import org.springframework.stereotype.Component;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//
//@Component
//public class JwtUtils {
//
//    private final String SECRET_KEY = "MyVerySecretKeyThatNeverChanges123456789";
//
//    public Claims validateToken(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(SECRET_KEY.getBytes())
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }
//}
