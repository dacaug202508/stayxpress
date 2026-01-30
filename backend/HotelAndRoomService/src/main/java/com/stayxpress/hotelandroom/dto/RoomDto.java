package com.stayxpress.hotelandroom.dto;

import com.stayxpress.hotelandroom.entities.RoomType;

public class RoomDto {
	Integer id;
	Integer hotelId;
	String roomNumber;
	String description;
	Double pricePerNight;
	Integer maxGuests;
	Boolean isActive;
	RoomType roomType;
	String image;
	
	
	
	
	

	 public RoomDto(
	            Integer id,
	            Integer hotelId,
	            String roomNumber,
	            RoomType roomType,   // must be String for JPQL projection
	            String description,
	            Double pricePerNight,
	            Integer maxGuests,
	            Boolean isActive,
	            String imageUrl) {

	        this.id = id;
	        this.hotelId = hotelId;
	        this.roomNumber = roomNumber;
	        this.roomType = roomType; // convert to enum
	        this.description = description;
	        this.pricePerNight = pricePerNight;
	        this.maxGuests = maxGuests;
	        this.isActive = isActive;
	        this.image = imageUrl;
	    }


public RoomDto() {}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public RoomType getRoomType() {
		return roomType;
	}
	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getHotelId() {
		return hotelId;
	}
	public void setHotelId(Integer hotelId) {
		this.hotelId = hotelId;
	}
	public String getRoomNumber() {
		return roomNumber;
	}
	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}
	public Double getPricePerNight() {
		return pricePerNight;
	}
	public void setPricePerNight(Double pricePerNight) {
		this.pricePerNight = pricePerNight;
	}
	public Integer getMaxGuests() {
		return maxGuests;
	}
	public void setMaxGuests(Integer maxGuests) {
		this.maxGuests = maxGuests;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
}
