package main

import (
    "fmt"
    "log"
    "net/http"

    "api/internal/router"
    "api/pkg/config"
    "github.com/gin-gonic/gin"
)

// CORSMiddleware sets the headers required for handling CORS requests
func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Header("Access-Control-Allow-Origin", "https://fullstack-go-next-app-4.onrender.com")
        c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
        c.Header("Access-Control-Allow-Credentials", "true")

        fmt.Println("Request Headers:", c.Request.Header)
        fmt.Println("Response Headers before Next:", c.Writer.Header())

        if c.Request.Method == http.MethodOptions {
            c.AbortWithStatus(http.StatusNoContent)
            return
        }

        c.Next()

        fmt.Println("Response Headers after Next:", c.Writer.Header())
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
