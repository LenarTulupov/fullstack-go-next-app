package main

import (
    "fmt"
    "log"
    "net/http"
    
    "api/pkg/config"
    "api/internal/router"
    "api/pkg/handlers"
    "github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Header("Access-Control-Allow-Origin", "https://fullstack-go-next-app-4.onrender.com")
        c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
        
        if c.Request.Method == http.MethodOptions {
            c.AbortWithStatus(http.StatusNoContent)
            return
        }
        
        c.Next()
    }
}

func main() {
    config.LoadConfig()

    r := router.SetupRouter()

    r.Use(CORSMiddleware())

    r.GET("/health", handlers.HealthHandler)

    port := ":8000"
    fmt.Printf("Server is running on port %s\n", port)
    if err := r.Run(port); err != nil {
        log.Fatal("Failed to start server: ", err)
    }
}
