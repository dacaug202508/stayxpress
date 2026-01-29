package com.stayxpress.hotelandroom.dto;

import java.time.LocalDate;

public class RoomAvailabilityDTO {

    private Integer roomId;
    private String roomNumber;
    private String roomType;
    private Double price;
    private Integer maxGuests;
    private Boolean isActive;
    private Boolean available;
    private LocalDate nextAvailableFrom; // will set later

    public RoomAvailabilityDTO(Integer roomId, String roomNumber, String roomType,
                               Double price, Integer maxGuests, Boolean isActive, Boolean available) {
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.price = price;
        this.maxGuests = maxGuests;
        this.isActive = isActive;
        this.available = available;
    }

	public Integer getRoomId() {
		return roomId;
	}

	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}

	public String getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
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

	public Boolean getAvailable() {
		return available;
	}

	public void setAvailable(Boolean available) {
		this.available = available;
	}

	public LocalDate getNextAvailableFrom() {
		return nextAvailableFrom;
	}

	public void setNextAvailableFrom(LocalDate nextAvailableFrom) {
		this.nextAvailableFrom = nextAvailableFrom;
	}
    
    
}
