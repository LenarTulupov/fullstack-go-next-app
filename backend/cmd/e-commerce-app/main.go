package main

import (
    "fmt"
    "log"
    "net/http"

    "api/internal/router"
    "api/pkg/config"
    "github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Header("Access-Control-Allow-Origin", "*") 
        c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
        c.Header("Access-Control-Allow-Credentials", "true")

        if c.Request.Method == http.MethodOptions {
            c.AbortWithStatus(http.StatusNoContent)
            return
        }

        c.Next()
    }
}

func main() {
    // Load configuration
    config.LoadConfig()

    // Setup the router
    r := router.SetupRouter()

    // Use the CORS middleware
    r.Use(CORSMiddleware())

    // Define the server port
    port := ":8000"
    fmt.Printf("Server is running on port %s\n", port)

    // Start the server and handle any errors
    if err := r.Run(port); err != nil {
        log.Fatal("Failed to start server: ", err)
    }
}
