package config

import (
	"database/sql"
	"log"
	"os"
	_ "github.com/lib/pq"
)

var (
    DB *sql.DB
    JwtSecretKey string
)


func LoadConfig() {
    dsn := os.Getenv("DATABASE_URL")
    if dsn == "" {
        log.Fatal("DATABASE_URL environment variable is not set")
    }

    var err error
    DB, err = sql.Open("postgres", dsn)
    if err != nil {
        log.Fatalf("Error connecting to database: %v", err)
    }

    if err := DB.Ping(); err != nil {
        log.Fatalf("Error pinging database: %v", err)
    }

    JwtSecretKey = os.Getenv("JWT_SECRET_KEY");
    if JwtSecretKey == "" {
        log.Fatal("JWT_SECRET_KEY environment variable is not set")
    }
}