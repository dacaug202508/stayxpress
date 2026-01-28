//package com.stayxpress.hotelandroom.controllers;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.stayxpress.hotelandroom.servicies.BookingService;
//
//@RestController
//@RequestMapping("/booking")
//@CrossOrigin(origins = "http://localhost:5173")
//public class BookingController {
//
//    private final BookingService bookingService;
//
//    public BookingController(BookingService bookingService) {
//        this.bookingService = bookingService;
//    }
//
//    @GetMapping("/booked-rooms/by-owner/{ownerId}")
//    public ResponseEntity<Map<String, Object>> getBookedRoomsByOwner(
//            @PathVariable Integer ownerId) {
//
//        Map<String, Object> map = new HashMap<>();
//        map.put("data", bookingService.getBookedRoomsByOwner(ownerId));
//
//        return ResponseEntity.ok(map);
//    }
//}
