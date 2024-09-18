package main

import (
    "fmt"
    "log"

    "api/pkg/config"
    "api/internal/router"
)

func main() {
    // Load configuration
    config.LoadConfig()

    // Initialize router
    r := router.SetupRouter()

    // Start server
    port := ":8080"
    fmt.Printf("Server is running on port %s\n", port)
    if err := r.Run(port); err != nil {
        log.Fatal("Failed to start server: ", err)
    }
}