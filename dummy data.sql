
USE hotelbooking;

-- USERS
INSERT INTO users VALUES
(1, 'Admin User', 'admin@hotel.com', 'hash_admin', NULL, 'ADMIN', 'ACTIVE', NOW(), NOW()),
(2, 'John Customer', 'john@gmail.com', 'hash_john', NULL, 'CUSTOMER', 'ACTIVE', NOW(), NOW()),
(3, 'Alice Owner', 'alice@hotel.com', 'hash_alice', NULL, 'OWNER', 'ACTIVE', NOW(), NOW());

-- OWNER REQUESTS
INSERT INTO owner_requests VALUES
(1, 3, 'APPROVED', NOW(), NOW(), 1);

-- HOTELS
INSERT INTO hotels VALUES
(1, 3, 'Grand Palace Hotel', 'Luxury stay in city center',
 'Main Street, Downtown', 'Bangalore', 'India',
 'ACTIVE', NOW(), NOW());

-- ROOMS
INSERT INTO rooms VALUES
(1, 1, '101', 'SINGLE', 3500.00, 2, TRUE, NOW(), NOW()),
(2, 1, '102', 'SUITE', 6000.00, 4, TRUE, NOW(), NOW());

-- IMAGES
INSERT INTO images VALUES
(1, 'HOTEL', 1, 'hotel_main.jpg', TRUE, NOW()),
(2, 'ROOM', 1, 'room101.jpg', TRUE, NOW()),
(3, 'ROOM', 2, 'room102.jpg', TRUE, NOW());

-- BOOKINGS
INSERT INTO bookings VALUES
(1, 'BK1001', 2, 1, '2026-02-01', '2026-02-05',
 'CONFIRMED', 14000.00, NOW(), NOW());

-- HOTEL SERVICES
INSERT INTO hotel_services VALUES
(1, 1, 'Breakfast', 'FOOD', 300.00, TRUE, NOW()),
(2, 1, 'Laundry Service', 'LAUNDRY', 150.00, TRUE, NOW());

-- BOOKING EXTRAS
INSERT INTO booking_extras VALUES
(1, 1, 1, 1, 1, 4, 300.00, 1200.00, 'DELIVERED', NOW());

-- REVIEWS
INSERT INTO reviews VALUES
(1, 2, 1, 1, 5, 'Excellent stay and service!', NOW());

-- BILL
INSERT INTO bill VALUES
(1, 1, 'Room Charges', 14000.00, NOW());

-- PAYMENT
INSERT INTO payment VALUES
(1, 1, 1, 'CARD', 'SUCCESS', 15200.00,
 'TXN123456', NOW(), NOW());
 
 
 
 
 
