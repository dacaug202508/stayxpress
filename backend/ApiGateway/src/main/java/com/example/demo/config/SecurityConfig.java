package com.example.demo.config;

import java.util.Base64;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import reactor.core.publisher.Mono;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.security.config.Customizer;

import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;


@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {

        return http
            // 🌍 CORS
            .cors(cors -> cors.configurationSource(exchange -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowCredentials(true);
                config.addAllowedOrigin("http://localhost:5173");
                config.addAllowedHeader("*");
                config.addAllowedMethod("*");
                return config;
            }))

            .csrf(ServerHttpSecurity.CsrfSpec::disable)

            .authorizeExchange(exchange -> exchange

                // 🟢 PUBLIC ROUTES
                .pathMatchers("/auth/**").permitAll()
                .pathMatchers(HttpMethod.OPTIONS).permitAll()

                // 👑 OWNER ONLY (put FIRST so they don’t get blocked by shared rules)
                .pathMatchers(HttpMethod.POST, "/hotel/save-hotel").hasRole("OWNER")
                .pathMatchers(HttpMethod.PUT, "/hotel/update-hotel/**").hasRole("OWNER")
                .pathMatchers(HttpMethod.DELETE, "/hotel/delete-hotel").hasRole("OWNER")
                .pathMatchers("/hotel/get-by-ownerid", "/hotel/by-userid/**").hasRole("OWNER")

                .pathMatchers(HttpMethod.POST, "/room/save-room").hasRole("OWNER")
                .pathMatchers(HttpMethod.PUT, "/room/update-room").hasRole("OWNER")
                .pathMatchers(HttpMethod.DELETE, "/room/delete-room").hasRole("OWNER")

                // 👥 SHARED HOTEL VIEW (CUSTOMER, USER, ADMIN, OWNER)
                .pathMatchers(HttpMethod.GET,
                    "/hotel/getallhotels",
                    "/hotel/getallhotels-bycity",
                    "/hotel/get-by-id"
                ).hasAnyRole("CUSTOMER", "USER", "ADMIN", "OWNER")

                // 👥 SHARED ROOM VIEW
                .pathMatchers(HttpMethod.GET,
                    "/room/get-room-by-hotel",
                    "/room/get-room/**",
                    "/room/get-by-hotel",
                    "/room/get-room-byid"
                ).hasAnyRole("CUSTOMER", "USER", "ADMIN", "OWNER")

                // 🖼 IMAGES (viewable by all logged-in roles)
                .pathMatchers(HttpMethod.GET, "/image/**")
                .hasAnyRole("CUSTOMER", "USER", "ADMIN", "OWNER")

                // 🔐 EVERYTHING ELSE REQUIRES LOGIN
                .anyExchange().authenticated()
            )

            // 🔑 JWT SECURITY
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
            )

            .build();
    }

    // 🔐 JWT Decoder
    @Bean
    public ReactiveJwtDecoder reactiveJwtDecoder() {
        byte[] keyBytes = Base64.getDecoder()
            .decode("TXlWZXJ5U2VjcmV0S2V5VGhhdE5ldmVyQ2hhbmdlczEyMzQ1Njc4OQ==");
        SecretKey key = new SecretKeySpec(keyBytes, "HmacSHA256");
        return NimbusReactiveJwtDecoder.withSecretKey(key).build();
    }

    // 🎭 Extract roles from "roles" claim
    @Bean
    public Converter<Jwt, Mono<AbstractAuthenticationToken>> jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter delegate = new JwtGrantedAuthoritiesConverter();
        delegate.setAuthoritiesClaimName("roles");
        delegate.setAuthorityPrefix(""); // roles already have ROLE_

        return jwt -> Mono.just(new JwtAuthenticationToken(jwt, delegate.convert(jwt)));
    }
}
