package com.stayxpress.hotelandroom.servicies;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.stayxpress.hotelandroom.dto.HotelDto;
import com.stayxpress.hotelandroom.entities.HotelEntity;
import com.stayxpress.hotelandroom.entities.HotelStatus;
import com.stayxpress.hotelandroom.entities.UserEntity;
import com.stayxpress.hotelandroom.repositories.HotelRepository;
import com.stayxpress.hotelandroom.repositories.UserRepository;

@Service
public class HotelService {
	
	private final HotelRepository hotelrepo;
	private final UserRepository userrepo;

	
	public HotelService(HotelRepository hotelrepo, UserRepository userrepo) {
		this.hotelrepo = hotelrepo;
		this.userrepo = userrepo;
	}
	
	
	public HotelEntity saveHotel(HotelDto hotel) throws Exception {
		try {
			
			UserEntity hotelowner = userrepo.findById(hotel.getOwnerId()).orElse(null);
			
			HotelEntity newHotel = new HotelEntity();
			newHotel.setHotelName(hotel.getHotelName());
			newHotel.setAddress(hotel.getAddress());
			newHotel.setCity(hotel.getCity());
			newHotel.setCountry(hotel.getCountry());
			newHotel.setOwner(hotelowner);
			newHotel.setDescription(hotel.getDescription());
			newHotel.setStatus(hotel.getStatus());
			return hotelrepo.save(newHotel);
		} catch (Exception e) {
			throw e;
		}
	}


	public List<HotelDto> getAllHotels() {
		List<Object[]> rows = hotelrepo.findHotelsWithPrimaryImage();

	    List<HotelDto> hotels = new ArrayList<>();

	    for (Object[] row : rows) {
	        HotelDto dto = new HotelDto();
	        dto.setId((Integer) row[0]);
	        dto.setOwnerId((Integer) row[1]);
	        dto.setHotelName((String) row[2]);
	        dto.setDescription((String) row[3]);
	        dto.setAddress((String) row[4]);
	        dto.setCity((String) row[5]);
	        dto.setCountry((String) row[6]);
	        dto.setStatus((HotelStatus) row[7]);
	        dto.setImageUrl((String) row[8]);

	        hotels.add(dto);
	    }

	    return hotels;
	}
	
	public HotelEntity updateHotel(HotelDto hotel, int hotelId) {
		try {
			
			UserEntity hotelowner = userrepo.findById(hotel.getOwnerId()).orElse(null);
			
			
			HotelEntity updatedHotel = new HotelEntity();
			updatedHotel.setId(hotelId);
			updatedHotel.setHotelName(hotel.getHotelName());
			updatedHotel.setAddress(hotel.getAddress());
			updatedHotel.setCity(hotel.getCity());
			updatedHotel.setCountry(hotel.getCountry());
			updatedHotel.setOwner(hotelowner);
			updatedHotel.setDescription(hotel.getDescription());
			updatedHotel.setStatus(hotel.getStatus());
			
			
			return hotelrepo.save(updatedHotel);
		} catch (Exception e) {
			throw e;
		}
	}
	
	
	public HotelEntity findHotelById(Integer id) {
		try {
			return hotelrepo.findById(id).orElse(null);
		} catch (Exception e) {
			throw e;
			}
	}
	
	public void deleteHotelById(Integer id) {
		try {
			hotelrepo.deleteById(id);
		} catch (Exception e) {	
			throw e;
		}
	}


	
	public List<HotelEntity> findHotelByUserId(Integer userID) {
		try {
			UserEntity owner = userrepo.findById(userID).orElse(null);
			
			List<HotelEntity> list =  hotelrepo.findByOwner(owner);
			return list;
			
		} catch (Exception e) {
			throw e;
			}
	}
	
	
}
