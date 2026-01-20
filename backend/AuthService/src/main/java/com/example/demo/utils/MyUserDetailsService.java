package com.example.demo.utils;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.Repositories.UserRepository;
import com.example.demo.entities.UserEntity;


@Service
public class MyUserDetailsService implements UserDetailsService {

	
	private final UserRepository userRepo;
	
	public MyUserDetailsService(UserRepository userRepo)
	{
		this.userRepo = userRepo;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		
		UserEntity user = userRepo.findByUsername(username);
		
		if(user == null) {
			throw new UsernameNotFoundException("User with the current username is not available"); 
		}
		
		return new UserPrincipal(user);
	}

}
