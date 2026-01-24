package com.stayxpress.hotelandroom.servicies;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stayxpress.hotelandroom.dto.RoomDto;
import com.stayxpress.hotelandroom.entities.HotelEntity;
import com.stayxpress.hotelandroom.entities.RoomEntity;
import com.stayxpress.hotelandroom.repositories.HotelRepository;
import com.stayxpress.hotelandroom.repositories.RoomRepository;

@Service
public class RoomService {

	
	private final RoomRepository roomrepo;
	private final HotelRepository hotelrepo;
	public RoomService(
			RoomRepository roomrepo,
		HotelRepository hotelrepo
			) {
		this.roomrepo = roomrepo;
		this.hotelrepo = hotelrepo;
	}
	
	
	public List<RoomEntity> getAllRooms() throws Exception {
		try {
			return roomrepo.findAll();
		} catch (Exception e) {
			throw e;
		}
	}
	
	
	public RoomEntity getRoomById(Integer id) {
		try {
			return roomrepo.findById(id).orElse(null);
		} catch (Exception e) {
			throw e;
		}
	}
	
	
	public RoomEntity updateRoomById(RoomDto room) {
		try {
		
			RoomEntity updatedRoom = new RoomEntity();
			
			HotelEntity hotel = hotelrepo.findById(room.getHotelId()).orElse(null);
			
//			System.out.println(room.getId());
			updatedRoom.setId(room.getId());
			updatedRoom.setRoomNumber(room.getRoomNumber());
			updatedRoom.setPricePerNight(room.getPricePerNight());
			updatedRoom.setMaxGuests(room.getMaxGuests());
			updatedRoom.setIsActive(room.getIsActive());
			updatedRoom.setRoomType(room.getRoomType());
			updatedRoom.setHotel(hotel);
			return roomrepo.save(updatedRoom);
		} catch (Exception e) {
			throw e;
		}
	}
	
	public RoomEntity saveRoom(RoomDto room) {
		try {
			
			RoomEntity savedRoom = new RoomEntity();
			
			HotelEntity hotel = hotelrepo.findById(room.getHotelId()).orElse(null);
			
			savedRoom.setHotel(hotel);
			savedRoom.setRoomNumber(room.getRoomNumber());
			savedRoom.setPricePerNight(room.getPricePerNight());
			savedRoom.setMaxGuests(room.getMaxGuests());
			savedRoom.setIsActive(room.getIsActive());
			savedRoom.setRoomType(room.getRoomType());
			return roomrepo.save(savedRoom);
		} catch (Exception e) {
			throw e;
		}
	}
	
	
	
	
	public void deleteRoomById(Integer id) {
		try {
			roomrepo.deleteById(id);
		} catch (Exception e) {
			throw e;
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
