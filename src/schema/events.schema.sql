 CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATETIME NOT NULL DEFAULT,
    total_capacity INT NOT NULL CHECK (total_capacity >= 0),
    remaining_tickets INT NOT NULL CHECK (remaining_tickets >= 0),
    
    
    CHECK (remaining_tickets <= total_capacity)
);