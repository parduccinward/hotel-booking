CREATE DATABASE hotelbooking;

\c hotelbooking;

CREATE TABLE hotel(
    hotel_id serial PRIMARY KEY,
    hotel_name TEXT NOT NULL,
    hotel_address TEXT NOT NULL,
    city TEXT NOT NULL,
    room_number INT NOT NULL,
    phone TEXT NOT NULL,
    website_url TEXT

);

CREATE TABLE guest(
    guest_id serial PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender TEXT NOT NULL
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL
);

CREATE TABLE booking(
    booking_id serial PRIMARY KEY,
    booking_date DATE NOT NULL,
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    num_persons INT NOT NULL,
    booking_state TEXT NOT NULL,
    hotel_id INT NOT NULL,
    CONSTRAINT fk_hotel FOREIGN KEY(hotel_id) REFERENCES hotel(hotel_id) ON DELETE CASCADE,
    guest_id INT NOT NULL,
    CONSTRAINT fk_guest FOREIGN KEY(guest_id) REFERENCES guest(guest_id) ON DELETE CASCADE
);

CREATE TABLE bill(
    bill_id serial PRIMARY KEY,
    total_amount INT NOT NULL,
    payment_date DATE NOT NULL,
    payment_option TEXT NOT NULL,
    booking_id INT NOT NULL,
    CONSTRAINT fk_booking FOREIGN KEY(booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE,
    guest_id INT NOT NULL,
    CONSTRAINT fk_guest FOREIGN KEY(guest_id) REFERENCES guest(guest_id) ON DELETE CASCADE
);

CREATE TABLE room(
    room_id serial PRIMARY KEY,
    occupancy BOOLEAN NOT NULL,
    booking_id INT NOT NULL,
    CONSTRAINT fk_booking FOREIGN KEY(booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);