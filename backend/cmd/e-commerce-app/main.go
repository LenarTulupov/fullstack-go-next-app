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

        fmt.Println("CORS Middleware called for:", c.Request.Method)
        
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

    port := ":8000"
    fmt.Printf("Server is running on port %s\n", port)
    if err := r.Run(port); err != nil {
        log.Fatal("Failed to start server: ", err)
    }
}
