package com.stayxpress.hotelandroom.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stayxpress.hotelandroom.dto.HotelDto;
import com.stayxpress.hotelandroom.entities.HotelEntity;
import com.stayxpress.hotelandroom.servicies.HotelService;

@RestController
@RequestMapping("/hotel")
public class HotelController {

	private final HotelService hotelservice;
	
	public HotelController(HotelService hotelservice) {
		this.hotelservice = hotelservice;
	}
	
	
	@GetMapping("/getallhotels")
	public List<HotelEntity> getAllHotels (){
		return hotelservice.getAllHotels();
	}
	
	
	@PostMapping("/save-hotel")
	public ResponseEntity<Map<String, Object>> saveHotel(@RequestBody HotelDto hotel){
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {System.out.println(hotel);
			
			HotelEntity savedHotel = hotelservice.saveHotel(hotel);
			map.put("data", savedHotel);
			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(map);
			
		} catch (Exception e) {
			map.put("error", e);
			return ResponseEntity
					.status(HttpStatus.BAD_GATEWAY)
					.body(map);
		}
		
	}
	
	@PutMapping("/update-hotel/{hotel_id}")
	public ResponseEntity<Map<String, Object>> updateHotel(@RequestBody HotelDto hotel, @PathVariable Integer hotel_id){
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {System.out.println(hotel);
			
			HotelEntity savedHotel = hotelservice.updateHotel(hotel, hotel_id);
			map.put("data", savedHotel);
			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(map);
			
		} catch (Exception e) {
			map.put("error", e);
			return ResponseEntity
					.status(HttpStatus.BAD_GATEWAY)
					.body(map);
		}
		
	}
	

	@DeleteMapping("/delete-hotel")
	public ResponseEntity<Map<String, Object>> deleteHotel(@RequestParam Integer hotelId){
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			
			hotelservice.deleteHotelById(hotelId);
			map.put("data", "delete success" );
			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(map);
			
		} catch (Exception e) {
			map.put("error", e);
			return ResponseEntity
					.status(HttpStatus.BAD_GATEWAY)
					.body(map);
		}
		
	}
	
	
	
	@GetMapping("/get-by-id")
	public ResponseEntity<Map<String, Object>> getHotelById(@RequestParam Integer hotelId){
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			
			HotelEntity hotel = hotelservice.findHotelById(hotelId);
			map.put("data", hotel );
			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(map);
			
		} catch (Exception e) {
			map.put("error", e);
			return ResponseEntity
					.status(HttpStatus.BAD_GATEWAY)
					.body(map);
		}
		
	}
}
