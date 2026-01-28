//package com.stayxpress.hotelandroom.entities;
//
//import jakarta.persistence.*;
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "bookings")
//public class BookingEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//
//    @Column(name = "booking_reference", nullable = false, unique = true)
//    private String bookingReference;
//
//    @ManyToOne
//    @JoinColumn(name = "customer_id", nullable = false)
//    private UserEntity customer;
//
//    @ManyToOne
//    @JoinColumn(name = "room_id", nullable = false)
//    private RoomEntity room;
//
//    @Column(name = "check_in_date", nullable = false)
//    private LocalDate checkInDate;
//
//    @Column(name = "check_out_date", nullable = false)
//    private LocalDate checkOutDate;
//
//    @Column(name = "booking_status", nullable = false)
//    private String bookingStatus; // CONFIRMED, CANCELLED
//
//    @Column(name = "total_price", nullable = false)
//    private Double totalPrice;
//
//    @Column(name = "created_at", updatable = false)
//    private LocalDateTime createdAt;
//
//    @Column(name = "updated_at")
//    private LocalDateTime updatedAt;
//
//    @PrePersist
//    public void onCreate() {
//        createdAt = LocalDateTime.now();
//        updatedAt = LocalDateTime.now();
//    }
//
//    @PreUpdate
//    public void onUpdate() {
//        updatedAt = LocalDateTime.now();
//    }
//
//	public Integer getId() {
//		return id;
//	}
//
//	public void setId(Integer id) {
//		this.id = id;
//	}
//
//	public String getBookingReference() {
//		return bookingReference;
//	}
//
//	public void setBookingReference(String bookingReference) {
//		this.bookingReference = bookingReference;
//	}
//
//	public UserEntity getCustomer() {
//		return customer;
//	}
//
//	public void setCustomer(UserEntity customer) {
//		this.customer = customer;
//	}
//
//	public RoomEntity getRoom() {
//		return room;
//	}
//
//	public void setRoom(RoomEntity room) {
//		this.room = room;
//	}
//
//	public LocalDate getCheckInDate() {
//		return checkInDate;
//	}
//
//	public void setCheckInDate(LocalDate checkInDate) {
//		this.checkInDate = checkInDate;
//	}
//
//	public LocalDate getCheckOutDate() {
//		return checkOutDate;
//	}
//
//	public void setCheckOutDate(LocalDate checkOutDate) {
//		this.checkOutDate = checkOutDate;
//	}
//
//	public String getBookingStatus() {
//		return bookingStatus;
//	}
//
//	public void setBookingStatus(String bookingStatus) {
//		this.bookingStatus = bookingStatus;
//	}
//
//	public Double getTotalPrice() {
//		return totalPrice;
//	}
//
//	public void setTotalPrice(Double totalPrice) {
//		this.totalPrice = totalPrice;
//	}
//
//	public LocalDateTime getCreatedAt() {
//		return createdAt;
//	}
//
//	public void setCreatedAt(LocalDateTime createdAt) {
//		this.createdAt = createdAt;
//	}
//
//	public LocalDateTime getUpdatedAt() {
//		return updatedAt;
//	}
//
//	public void setUpdatedAt(LocalDateTime updatedAt) {
//		this.updatedAt = updatedAt;
//	}
//
//	public BookingEntity() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//
//	public BookingEntity(Integer id, String bookingReference, UserEntity customer, RoomEntity room,
//			LocalDate checkInDate, LocalDate checkOutDate, String bookingStatus, Double totalPrice,
//			LocalDateTime createdAt, LocalDateTime updatedAt) {
//		super();
//		this.id = id;
//		this.bookingReference = bookingReference;
//		this.customer = customer;
//		this.room = room;
//		this.checkInDate = checkInDate;
//		this.checkOutDate = checkOutDate;
//		this.bookingStatus = bookingStatus;
//		this.totalPrice = totalPrice;
//		this.createdAt = createdAt;
//		this.updatedAt = updatedAt;
//	}
//    
//    
//    
//}
