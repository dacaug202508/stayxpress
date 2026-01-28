//package com.stayxpress.hotelandroom.repositories;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import com.stayxpress.hotelandroom.dto.OwnerBookedRoomDTO;
//import com.stayxpress.hotelandroom.entities.BookingEntity;
//
//public interface BookingRepository extends JpaRepository<BookingEntity, Integer> {
//
//    @Query("""
//        SELECT new com.stayxpress.hotelandroom.dto.OwnerBookedRoomDTO(
//            b.id,
//            b.bookingReference,
//            b.checkInDate,
//            b.checkOutDate,
//            b.bookingStatus,
//            b.totalPrice,
//
//            r.id,
//            r.roomNumber,
//            r.roomType,
//            r.pricePerNight,
//            r.maxGuests,
//
//            h.id,
//            h.hotelName
//        )
//        FROM BookingEntity b
//        JOIN b.room r
//        JOIN r.hotel h
//        WHERE h.owner.id = :ownerId
//        AND b.bookingStatus = 'CONFIRMED'
//    """)
//    List<OwnerBookedRoomDTO> findBookedRoomsByOwner(
//        @Param("ownerId") Integer ownerId
//    );
//}
