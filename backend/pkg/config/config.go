package config

import (
    "database/sql"
    "log"
    "os"

    _ "github.com/lib/pq" // PostgreSQL driver
    "github.com/joho/godotenv"
)

var DB *sql.DB

func LoadConfig() {
    // Load environment variables from .env file
    if err := godotenv.Load("..//.env"); err != nil {
        log.Fatalf("Error loading .env file: %v", err)
    }

    // Retrieve DATABASE_URL from environment variables
    dsn := os.Getenv("DATABASE_URL")
    if dsn == "" {
        log.Fatal("DATABASE_URL environment variable is not set")
    }

    var err error
    DB, err = sql.Open("postgres", dsn)
    if err != nil {
        log.Fatalf("Error connecting to database: %v", err)
    }

    // Optionally, check if the database is reachable
    if err := DB.Ping(); err != nil {
        log.Fatalf("Error pinging database: %v", err)
    }
}