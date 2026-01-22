package com.example.demo.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class RoutConfig {

    @Bean
     RouteLocator createRoute(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("AuthService",r-> 
				r.path("/auth/**")
//				.uri("http://localhost:8081/")
				.uri("lb://AuthService"))
				.build();
	}
	
	
}
