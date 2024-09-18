package router

import (
    "github.com/gin-gonic/gin"
    "api/pkg/handlers" // Убедитесь, что путь правильный
)

func SetupRouter() *gin.Engine {
    r := gin.Default()

    r.GET("/health", handlers.HealthCheckHandler)
    
    return r
}