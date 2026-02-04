package com.stayxpress.hotelandroom.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stayxpress.hotelandroom.dto.RoomDto;
import com.stayxpress.hotelandroom.entities.HotelEntity;
import com.stayxpress.hotelandroom.entities.RoomEntity;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Integer> {


	 List<RoomEntity> findByHotelId(Integer hotelId);

	List<RoomEntity> findByHotel(HotelEntity hotel);

	@Query("""
			SELECT new com.stayxpress.hotelandroom.dto.RoomDto(
			    r.id,
			    r.hotel.id,
			    r.roomNumber,
			    r.roomType,
			    r.description,
			    r.pricePerNight,
			    r.maxGuests,
			    r.isActive,
			    img.imageUrl
			)
			FROM RoomEntity r
			LEFT JOIN ImageEntity img
			       ON img.entityId = r.id
			       AND img.entityType = 'ROOM'
						WHERE r.hotel.id = :hotelId
			""")
			List<RoomDto> getRoomsByHotelWithImages(@Param("hotelId") Integer hotelId);

	@Query("""
			SELECT new com.stayxpress.hotelandroom.dto.RoomDto(
 r.id,
 r.hotel.id,
 r.roomNumber,
 r.roomType,
 r.description,
 r.pricePerNight,
 r.maxGuests,
 r.isActive,
 img.imageUrl)
			FROM RoomEntity r
			LEFT JOIN ImageEntity img
			       ON img.entityId = r.id
			       AND img.entityType = 'ROOM'
			     
			WHERE r.id = :roomId
			""")
			RoomDto getRoomByWithImages(@Param("roomId") Integer roomId);



}
