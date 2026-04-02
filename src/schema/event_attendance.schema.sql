 CREATE TABLE event_attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    
    entry_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_attendance_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
        
    
        
    CONSTRAINT unique_attendance UNIQUE (user_id)
);

