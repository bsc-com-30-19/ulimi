-- Create Users table to store user information
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Transactions table to store financial transactions
CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type ENUM('income', 'expense') NOT NULL,
    category VARCHAR(50), -- e.g., "Sales", "Feed", "Equipment"
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Notifications table to track notification history
CREATE TABLE Notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(100),
    message TEXT,
    scheduled_at TIMESTAMP, -- When the notification was/will be sent
    status ENUM('pending', 'sent', 'read') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Goals table for financial goals set by the user
CREATE TABLE Goals (
    goal_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    target_amount DECIMAL(10, 2) NOT NULL, -- Amount goal to reach
    current_amount DECIMAL(10, 2) DEFAULT 0.00, -- Current progress towards goal
    description TEXT,
    due_date DATE, -- Date by which the goal should be reached
    status ENUM('in_progress', 'achieved', 'missed') DEFAULT 'in_progress',
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Budget table to set monthly or weekly spending limits for users
CREATE TABLE Budget (
    budget_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    period ENUM('weekly', 'monthly') NOT NULL,
    limit_amount DECIMAL(10, 2) NOT NULL, -- Spending limit
    start_date DATE NOT NULL, -- Start date of the period
    end_date DATE NOT NULL, -- End date of the period
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create an index on user_id for efficient querying
CREATE INDEX idx_user_id ON Transactions(user_id);
CREATE INDEX idx_user_id_notifications ON Notifications(user_id);
CREATE INDEX idx_user_id_goals ON Goals(user_id);
CREATE INDEX idx_user_id_budget ON Budget(user_id);
