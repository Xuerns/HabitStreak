# HabitStreak
Habit Streak is a web application that helps users track their daily habits. 
Users must maintain their streak to unlock different UI appearances at each level. 
There are 6 levels in total, and the higher your streak, the better the UI experience becomes.
<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
</p>

## Installation
Clone this repository
```bash
git clone https://github.com/Xuerns/HabitStreak.git
cd HabitStreak
```
## Backend Setup
Install dependency
```bash
cd backend
npm install
```
Setup environment
```bash
JWT_SECRET="Your JWT Secret"
DB_HOST="Your host"
DP_PASSWORD="Your DB Password"
DB_USER="Your DB User"
DB_NAME="Your DB Name"
PORT=3000
```
Setup DataBase
```bash
CREATE DATABASE "DatabaseName";

Use "DatabaseName";

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE habits (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    DESCRIPTION TEXT, 
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    streak INT DEFAULT 0, 
    last_completed DATE NULL FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE, 
);

CREATE TABLE habits_logs (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    habits_id INT NOT NULL, 
    Date DATE NOT NULL, 
    completed BOOLEAN DEFAULT TRUE, 
    UNIQUE (habits_id, DATE), 
    FOREIGN KEY (habits_id) REFERENCES habits(id) ON DELETE CASCADE
);

CREATE TABLE activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  habits_id INT NOT NULL,
  action ENUM('complete', 'undo') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (habits_id) REFERENCES habits(id)
);
```
Run Server
```bash
npm run dev
```
## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

# Preview
Preview of all levels in HabitStreak. The UI progressively improves based on the user's streak, delivering a better experience at each milestone.

## Level 1
![Dashboard Level 1](.\preview\Level_1\Dashboard.jpg)

![HabitsPage Level 1](.\preview\Level_1\Habits.jpg)

![Analytics Level 1](.\preview\Level_1\Analytics.jpg)


## Level 2
![Dashboard Level 1](.\preview\Level_2\Dashboard.jpg)

![HabitsPage Level 1](.\preview\Level_2\Habits.jpg)

![Analytics Level 1](.\preview\Level_2\Analytics.jpg)


## Level 3
![Dashboard Level 1](.\preview\Level_3\Dashboard.jpg)

![HabitsPage Level 1](.\preview\Level_3\Habits.jpg)

![Analytics Level 1](.\preview\Level_3\Analytics.jpg)


## Level 4
![Dashboard Level 1](.\preview\Level_4\Dashboard.jpg)

![HabitsPage Level 1](.\preview\Level_4\Habits.jpg)

![Analytics Level 1](.\preview\Level_4\Analytics.jpg)


## Level 5
![Dashboard Level 1](.\preview\Level_5\Dashboard.jpg)

![HabitsPage Level 1](.\preview\Level_5\Habits.jpg)

![Analytics Level 1](.\preview\Level_5\Analytics.jpg)

## Level 6
![Dashboard Level 1](.\preview\Level_6\Dashboard.jpg)

![HabitsPage Level 1](.\preview\Level_6\Habits.jpg)

![Analytics Level 1](.\preview\Level_6\Analytics.jpg)