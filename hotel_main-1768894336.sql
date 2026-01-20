CREATE DATABASE IF NOT EXISTS hotelbooking;
USE hotelbooking;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255),
    role ENUM('CUSTOMER','OWNER','ADMIN') NOT NULL,
    status ENUM('ACTIVE','DISABLED') NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- =========================
-- OWNER REQUESTS
-- =========================
CREATE TABLE owner_requests (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    request_status ENUM('PENDING','APPROVED','REJECTED') NOT NULL,
    requested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    reviewed_by BIGINT NULL,
    PRIMARY KEY (id),
    CONSTRAINT owner_requests_fk1 FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT owner_requests_fk2 FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

-- =========================
-- HOTELS
-- =========================
CREATE TABLE hotels (
    id BIGINT NOT NULL AUTO_INCREMENT,
    owner_id BIGINT NOT NULL,
    hotel_name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    status ENUM('ACTIVE','INACTIVE') NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT hotels_fk1 FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- =========================
-- ROOMS
-- =========================
CREATE TABLE rooms (
    id BIGINT NOT NULL AUTO_INCREMENT,
    hotel_id BIGINT NOT NULL,
    room_number VARCHAR(20) NOT NULL,
    room_type ENUM('SINGLE','DOUBLE','SUITE') NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    max_guests INT NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT rooms_fk1 FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

-- =========================
-- IMAGES
-- =========================
CREATE TABLE images (
    image_id BIGINT NOT NULL AUTO_INCREMENT,
    entity_type ENUM('HOTEL','ROOM') NOT NULL,
    entity_id BIGINT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (image_id)
);

-- =========================
-- BOOKINGS
-- =========================
CREATE TABLE bookings (
    id BIGINT NOT NULL AUTO_INCREMENT,
    booking_reference VARCHAR(50) NOT NULL,
    customer_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    booking_status ENUM('CONFIRMED','CANCELLED','COMPLETED') NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT bookings_fk1 FOREIGN KEY (customer_id) REFERENCES users(id),
    CONSTRAINT bookings_fk2 FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- =========================
-- HOTEL SERVICES
-- =========================
CREATE TABLE hotel_services (
    id BIGINT NOT NULL AUTO_INCREMENT,
    hotel_id BIGINT NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    service_type ENUM('FOOD','ROOM_SERVICE','LAUNDRY','SPA','MINIBAR') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT hotel_services_fk1 FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

-- =========================
-- BOOKING EXTRAS
-- =========================
CREATE TABLE booking_extras (
    id BIGINT NOT NULL AUTO_INCREMENT,
    booking_id BIGINT NOT NULL,
    hotel_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    purchase_status ENUM('ORDERED','DELIVERED','CANCELLED') NOT NULL,
    ordered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT booking_extras_fk1 FOREIGN KEY (booking_id) REFERENCES bookings(id),
    CONSTRAINT booking_extras_fk2 FOREIGN KEY (hotel_id) REFERENCES hotels(id),
    CONSTRAINT booking_extras_fk3 FOREIGN KEY (room_id) REFERENCES rooms(id),
    CONSTRAINT booking_extras_fk4 FOREIGN KEY (service_id) REFERENCES hotel_services(id)
);

-- =========================
-- REVIEWS
-- =========================
CREATE TABLE reviews (
    id BIGINT NOT NULL AUTO_INCREMENT,
    customer_id BIGINT NOT NULL,
    hotel_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    rating INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT reviews_fk1 FOREIGN KEY (customer_id) REFERENCES users(id),
    CONSTRAINT reviews_fk2 FOREIGN KEY (hotel_id) REFERENCES hotels(id),
    CONSTRAINT reviews_fk3 FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- =========================
-- BILL
-- =========================
CREATE TABLE bill (
    bill_id BIGINT NOT NULL AUTO_INCREMENT,
    booking_id BIGINT NOT NULL,
    bill_name VARCHAR(100) NOT NULL,
    base_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (bill_id),
    CONSTRAINT bill_fk1 FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- =========================
-- PAYMENT
-- =========================
CREATE TABLE payment (
    payment_id BIGINT NOT NULL AUTO_INCREMENT,
    bill_id BIGINT NOT NULL,
    booking_id BIGINT NOT NULL,
    payment_method ENUM('CARD','UPI','NETBANKING','CASH') NOT NULL,
    payment_status ENUM('PENDING','SUCCESS','FAILED','REFUNDED') NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    transaction_reference VARCHAR(100) NOT NULL,
    paid_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (payment_id),
    CONSTRAINT payment_fk1 FOREIGN KEY (bill_id) REFERENCES bill(bill_id),
    CONSTRAINT payment_fk2 FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
