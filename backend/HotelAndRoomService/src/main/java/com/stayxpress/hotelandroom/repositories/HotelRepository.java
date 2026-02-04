package com.stayxpress.hotelandroom.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stayxpress.hotelandroom.dto.HotelDto;
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
		    WHERE LOWER(h.city) = LOWER(:city)
	 		
	 		
	 		""")
	 List<Object[]> findByCityIgnoreCase(String city);
		
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
			 WHERE h.status = 'ACTIVE'
			 """)
			 List<Object[]> findHotelsWithPrimaryImage();

	
			 @Query("""
					    SELECT new com.stayxpress.hotelandroom.dto.HotelDto(
					        h.id,
					        h.owner.id,
					        h.hotelName,
					        h.description,
					        h.address,
					        h.city,
					        h.country,
					        h.status,
					        img.imageUrl
					    )
					    FROM HotelEntity h
					    LEFT JOIN ImageEntity img
					           ON img.entityId = h.id
					           AND img.entityType = 'HOTEL'
					    WHERE h.owner.id = :ownerId
					""")
					List<HotelDto> findHotelsByOwnerIdWithImage(@Param("ownerId") Integer ownerId);

	
}
