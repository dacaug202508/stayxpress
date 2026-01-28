package com.stayxpress.hotelandroom.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stayxpress.hotelandroom.dto.RoomDto;
import com.stayxpress.hotelandroom.entities.RoomEntity;
import com.stayxpress.hotelandroom.servicies.RoomService;

@RestController
@RequestMapping("/room")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {
		
	private final RoomService roomservice;
	
	
	public RoomController(RoomService roomservice) {
		this.roomservice = roomservice;
		
	}
	
	@GetMapping("/get-all-rooms")
	public ResponseEntity<?> getAllRooms(){
		try {
			
			List<RoomEntity> rooms = roomservice.getAllRooms();			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(rooms);
					
		} catch (Exception e) {
			return ResponseEntity
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(e);
		}
	}
	
	

	@GetMapping("/get-room/{id}")
	public ResponseEntity<?> getRoom(@PathVariable Integer id){
		try {
			Map<String, Object> map = new HashMap<>();
			
			
			RoomEntity room = roomservice.getRoomById(id);
			map.put("room", room);
			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(map);
					
		} catch (Exception e) {
			return ResponseEntity
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(e);
		}
	}
	
	
	
	@PostMapping("/save-room")
	public ResponseEntity<?> saveRoom(@RequestBody RoomDto room){
		try {
			
			RoomEntity savedRoom = roomservice.saveRoom(room);
			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(savedRoom);
			
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.BAD_GATEWAY)
					.body(e);
		}
	}
	
	
	@PutMapping("/update-room")
	public ResponseEntity<?> updateRoom(@RequestBody RoomDto room){
		try {
			
			RoomEntity updatedRoom = roomservice.updateRoomById(room);
			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(updatedRoom);
			
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.BAD_GATEWAY)
					.body(e);
		}
	}
	
	@DeleteMapping("/delete-room")
	public ResponseEntity<?> deleteRoom(@RequestParam Integer id){
		try {
			
			roomservice.deleteRoomById(id);
			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body("deleted successfully");
			
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.BAD_GATEWAY)
					.body(e);
		}
	}
	
	
	
	
	
	
	
	
}
