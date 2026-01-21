package com.example.demo.entities;

public class UserRegistrationDto {
	String username;
	ROLES role;
	
	public UserRegistrationDto() {
		super();
		
	}
	
	
	public UserRegistrationDto(String username, ROLES roles) {
		super();
		this.username = username;
		this.role = roles;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}


	public ROLES getRole() {
		return role;
	}


	public void setRole(ROLES role) {
		this.role = role;
	}
	
	
	
}

