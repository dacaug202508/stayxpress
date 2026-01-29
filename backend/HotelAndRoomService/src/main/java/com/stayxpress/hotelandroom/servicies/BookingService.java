//package com.stayxpress.hotelandroom.servicies;
//
//import java.util.List;
//
//import org.springframework.stereotype.Service;
//
//import com.stayxpress.hotelandroom.dto.OwnerBookedRoomDTO;
//import com.stayxpress.hotelandroom.repositories.BookingRepository;
//
//@Service
//public class BookingService {
//
//    private final BookingRepository bookingRepository;
//
//    public BookingService(BookingRepository bookingRepository) {
//        this.bookingRepository = bookingRepository;
//    }
//
//    public List<OwnerBookedRoomDTO> getBookedRoomsByOwner(Integer ownerId) {
//        return bookingRepository.findBookedRoomsByOwner(ownerId);
//    }
//}
