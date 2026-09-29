# Gym Management System

A Java Swing application for managing gym members with MySQL database integration.

## Features
- Add / Update / Delete members
- Search by name or phone
- Membership plan selection
- MySQL database backend

## Tech Stack
- Java Swing (GUI)
- MySQL (Database)
- JDBC (MySQL Connector/J 8.3.0)

## Setup
1. Install JDK 11+
2. Run `database_setup.sql` in MySQL
3. Update DB credentials in `src/gym/DBConnection.java`
4. Compile: `javac -cp "lib/*" src/gym/*.java -d bin`
5. Run: `java -cp "bin;lib/*" gym.GymApp`

## Author
- ssrirajarithik25csec58-coder
