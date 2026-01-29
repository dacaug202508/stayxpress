package com.example.demo.Controllers;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Services.UserService;
import com.example.demo.entities.LoginDto;
import com.example.demo.entities.UserEntity;
import com.example.demo.entities.UserRegistrationDto;
import com.example.demo.utils.JwtServiceUtil;

import io.jsonwebtoken.Claims;

import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/auth")
public class UserControllers {


	@Autowired
	private UserService userService;

	
	
	
	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> registerUser(@RequestBody UserEntity user) {
		UserRegistrationDto savedUser = null;
		try {
			
			 savedUser =  userService.saveUser(user);
			
		}catch(Exception e) {
			Map<String, Object> err = new HashMap<String, Object>();
			err.put("err", e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(err);
		}
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("user", savedUser);
		
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	
	@GetMapping("/getall")
	public List<UserEntity> getAllUsers()
	{
		List<UserEntity> allUsers = null;
		try {
			
			 allUsers =  userService.allUsers();
			System.out.println(allUsers);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return allUsers;
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto user) {
	    try {
	        System.out.println("LOGIN ATTEMPT");
	        Map<String, String> loginRes = userService.authenticate(user);
	        System.out.println("LOGIN RESPONSE = " + loginRes);
	        return ResponseEntity.ok(loginRes);

	    } catch (Exception e) {   // catch EVERYTHING
	        e.printStackTrace();  // 🔥 IMPORTANT
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body("Login failed: " + e.getClass().getSimpleName());
	    }
	}

	
	@GetMapping("/get-allclaims")
	public ResponseEntity<?> getAllClaims(@RequestHeader String Authorization, @RequestParam String username)
	{
		try {
			String token = Authorization.substring(7);
			Claims claims = userService.getClaims(token, username);
//			claims.toString();
			
			return ResponseEntity.ok(claims);
		} catch (Exception e) {
			 return ResponseEntity
		                .status(HttpStatus.INTERNAL_SERVER_ERROR) // 500
		                .body("Something went wrong");
		}
			
	}
	
	
}
