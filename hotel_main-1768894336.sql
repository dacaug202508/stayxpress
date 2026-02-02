use hotelbooking;
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE booking_extras;
TRUNCATE TABLE payment;
TRUNCATE TABLE bill;
TRUNCATE TABLE reviews;
TRUNCATE TABLE bookings;
TRUNCATE TABLE room_amenities;
TRUNCATE TABLE hotel_services;
TRUNCATE TABLE images;
TRUNCATE TABLE rooms;
TRUNCATE TABLE hotels;
TRUNCATE TABLE owner_requests;
TRUNCATE TABLE users;
TRUNCATE TABLE amenities;

SET FOREIGN_KEY_CHECKS = 1;

DROP DATABASE IF EXISTS hotelbooking;
CREATE DATABASE hotelbooking;
USE hotelbooking;

-- USERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255),
    role ENUM('CUSTOMER','OWNER','ADMIN') NOT NULL,
    status ENUM('ACTIVE','DISABLED') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- OWNER REQUESTS
CREATE TABLE owner_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    request_status ENUM('PENDING','APPROVED','REJECTED') NOT NULL,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    reviewed_by INT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

-- HOTELS
CREATE TABLE hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    hotel_name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    status ENUM('ACTIVE','INACTIVE') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- ROOMS
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL,
    room_number VARCHAR(20) NOT NULL,
    room_type ENUM('SINGLE','DOUBLE','SUITE') NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    max_guests INT NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

-- IMAGES
CREATE TABLE images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('HOTEL','ROOM') NOT NULL,
    entity_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BOOKINGS (UPDATED)
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_reference VARCHAR(50) NOT NULL,
    customer_id INT NOT NULL,
    hotel_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    booking_status ENUM('CONFIRMED','CANCELLED','COMPLETED') NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- HOTEL SERVICES
CREATE TABLE hotel_services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    service_type ENUM('FOOD','ROOM_SERVICE','LAUNDRY','SPA','MINIBAR') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

-- BOOKING EXTRAS
CREATE TABLE booking_extras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    hotel_id INT NOT NULL,
    room_id INT NOT NULL,
    service_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    purchase_status ENUM('ORDERED','DELIVERED','CANCELLED') NOT NULL,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (service_id) REFERENCES hotel_services(id)
);

-- REVIEWS
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    hotel_id INT NOT NULL,
    room_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- BILL
CREATE TABLE bill (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    bill_name VARCHAR(100) NOT NULL,
    base_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- PAYMENT
CREATE TABLE payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    bill_id INT NOT NULL,
    booking_id INT NOT NULL,
    payment_method ENUM('CARD','UPI','NETBANKING','CASH') NOT NULL,
    payment_status ENUM('PENDING','SUCCESS','FAILED','REFUNDED') NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    transaction_reference VARCHAR(100) NOT NULL,
    paid_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bill_id) REFERENCES bill(bill_id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- AMENITIES
CREATE TABLE amenities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amenity_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ROOM AMENITIES
CREATE TABLE room_amenities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    amenity_id INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE,
    UNIQUE (room_id, amenity_id)
);