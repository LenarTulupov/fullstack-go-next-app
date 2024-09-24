package main

import (
	"fmt"
	"log"

	"api/internal/middleware"
	"api/internal/router"
	"api/pkg/config"
)

func main() {
    config.LoadConfig()

    r := router.SetupRouter()

    r.Use(middleware.CORSMiddleware())

    port := ":8000"
    fmt.Printf("Server is running on port %s\n", port)

    if err := r.Run(port); err != nil {
        log.Fatal("Failed to start server: ", err)
    }
}
