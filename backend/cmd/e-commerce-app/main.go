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
        // Allow only specific origin (replace with your actual frontend URL)
        c.Header("Access-Control-Allow-Origin", "https://fullstack-go-next-app-4.onrender.com") // Set to your frontend's URL

        // Allow common HTTP methods
        c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")

        // Allow common headers used in requests
        c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")

        // Allow credentials if needed (cookies, authorization headers, etc.)
        c.Header("Access-Control-Allow-Credentials", "true")

        fmt.Println("CORS Middleware called for:", c.Request.Method)

        // Handle preflight requests
        if c.Request.Method == http.MethodOptions {
            c.AbortWithStatus(http.StatusNoContent)
            return
        }

        // Continue to the next middleware or handler
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
