{/* Create Database */}
CREATE DATABASE habitStreak;

{/* Table User */}
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

{/* Table Habits */} 
CREATE TABLE habits (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    DESCRIPTION TEXT, 
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    streak INT DEFAULT 0, 
    last_completed DATE NULL FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE, 
);

{/* Table Habits Logs */}
CREATE TABLE habits_logs (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    habits_id INT NOT NULL, 
    Date DATE NOT NULL, 
    completed BOOLEAN DEFAULT TRUE, 
    UNIQUE (habits_id, DATE), 
    FOREIGN KEY (habits_id) REFERENCES habits(id) ON DELETE CASCADE
);

{/* Table Activity Logs */}
CREATE TABLE activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  habits_id INT NOT NULL,
  action ENUM('complete', 'undo') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (habits_id) REFERENCES habits(id)
);