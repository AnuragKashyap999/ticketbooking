CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_booking_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_booking_event
        FOREIGN KEY (event_id) REFERENCES events(id)
        ON DELETE CASCADE,
        
    UNIQUE KEY unique_booking (user_id, event_id)
);