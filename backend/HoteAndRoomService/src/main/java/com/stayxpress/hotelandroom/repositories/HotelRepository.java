package com.stayxpress.hotelandroom.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stayxpress.hotelandroom.entities.HotelEntity;
import com.stayxpress.hotelandroom.entities.UserEntity;

import java.util.List;


@Repository
public interface HotelRepository extends JpaRepository<HotelEntity, Integer> {

	 List<HotelEntity> findByOwner(UserEntity owner);
		
	
		
	
}
