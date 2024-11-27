-- Create Tatabase
sqlite3 LocalStorage.db

-- Create Crops Table
CREATE TABLE IF NOT EXISTS crops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    expectedyielddate DATE NOT NULL,
    amountplanted DECIMAL(10,2) NOT NULL,
    dateplanted DATE NOT NULL);

-- Create harvest Table
CREATE TABLE IF NOT EXISTS harvest (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    dateharvested DATE NOT NULL,
    amountharvested DECIMAL(10,2) NOT NULL);

-- Create storage Table
CREATE TABLE IF NOT EXISTS storage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    amountinstorage DECIMAL(10,2) NOT NULL);

-- Create crop tasks Table
CREATE TABLE IF NOT EXISTS croptasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    duedate DATE NOT NULL);

-- Create Livestock Table
CREATE TABLE IF NOT EXISTS livestock (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    vaccinationstat NOT NULL CHECK (vaccinationstat IN('Vaccinated, Not Vaccinated, Due For Vaccination')),
    --delete dateplanted DATE NOT NULL
    );

-- Create Produce Table
CREATE TABLE IF NOT EXISTS produce (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    datecollected DATE NOT NULL);

-- Create Livestock tasks Table
CREATE TABLE IF NOT EXISTS livestocktasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    duedate DATE NOT NULL);

-- Create finances Table
CREATE TABLE IF NOT EXISTS finances(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(10) NOT NULL CHECK (type IN('Expense', 'Income')),
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL);