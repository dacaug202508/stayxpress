package com.stayxpress.hotelandroom.dto;

import java.time.LocalDateTime;

import com.stayxpress.hotelandroom.entities.HotelStatus;


public class HotelDto {

	    private Integer id;

	 
	    private Integer ownerId;

	   
	    private String hotelName;

	    private String description;

	    private String address;

	    private String city;

	    private String country;

	    private HotelStatus status;
	    private String imageUrl;

	    
	    

		public String getImageUrl() {
			return imageUrl;
		}

		public void setImageUrl(String imageUrl) {
			this.imageUrl = imageUrl;
		}

		public void setOwnerId(Integer ownerId) {
			this.ownerId = ownerId;
		}

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public Integer getOwnerId() {
			return ownerId;
		}

		public void setOwner(Integer ownerId) {
			this.ownerId = ownerId;
		}

		public String getHotelName() {
			return hotelName;
		}

		public void setHotelName(String hotelName) {
			this.hotelName = hotelName;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}

		public String getCountry() {
			return country;
		}

		public void setCountry(String country) {
			this.country = country;
		}

		public HotelStatus getStatus() {
			return status;
		}

		public void setStatus(HotelStatus status) {
			this.status = status;
		}
	    
	    
	    

}
