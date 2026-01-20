package com.example.demo.Repositories;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, BigInteger> {

	UserEntity findByUsername(String username);
	UserEntity findByEmail(String email);
}
