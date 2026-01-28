package com.stayxpress.hotelandroom.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stayxpress.hotelandroom.entities.HotelEntity;
import com.stayxpress.hotelandroom.entities.UserEntity;

import java.util.List;


@Repository
public interface HotelRepository extends JpaRepository<HotelEntity, Integer> {

	 List<HotelEntity> findByOwner(UserEntity owner);
		
	 @Query("""
			 SELECT h.id,
			        h.owner.id,
			        h.hotelName,
			        h.description,
			        h.address,
			        h.city,
			        h.country,
			        h.status,
			        i.imageUrl
			 FROM HotelEntity h
			 LEFT JOIN ImageEntity i
			   ON i.entityId = h.id 
			   AND i.entityType = 'HOTEL'
			   AND i.isPrimary = true
			 WHERE h.status = 'ACTIVE'
			 """)
			 List<Object[]> findHotelsWithPrimaryImage();

	
		
	
}
