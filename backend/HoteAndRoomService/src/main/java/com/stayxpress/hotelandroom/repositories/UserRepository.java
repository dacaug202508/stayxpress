package com.stayxpress.hotelandroom.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stayxpress.hotelandroom.entities.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

}
