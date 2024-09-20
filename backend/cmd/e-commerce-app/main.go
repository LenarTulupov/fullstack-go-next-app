package main

import (
    "fmt"
    "log"
    "net/http"
    
    "api/pkg/config"
    "api/internal/router"
    "github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Header("Access-Control-Allow-Origin", "*")
        c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
        
        // Allow preflight requests
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

    // Initialize router
    r := router.SetupRouter()

    r.Use(CORSMiddleware())

    // Start server
    port := ":8080"
    fmt.Printf("Server is running on port %s\n", port)
    if err := r.Run(port); err != nil {
        log.Fatal("Failed to start server: ", err)
    }
}