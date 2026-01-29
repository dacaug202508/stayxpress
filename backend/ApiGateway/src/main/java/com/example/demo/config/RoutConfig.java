package com.example.demo.config;


import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;

@Configuration
public class RoutConfig {

    @Bean
     RouteLocator createRoute(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("AuthService",
						r-> 
				r.path("/auth/**")
//				.uri("http://localhost:8081/")
				.uri("lb://AuthService"))
				.route("HotelAndRoomService",
						r -> r.path("/hotel/**", "/room/**", "/image/**")
						.uri("lb://HotelAndRoomService")
						)			.build();
	}
    
    
    	
}
