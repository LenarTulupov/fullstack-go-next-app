package handlers

import (
    "net/http"
    "log"

    "github.com/gin-gonic/gin"
)

func HealthHandler(c *gin.Context) {
    log.Println("Health check requested")
    c.JSON(http.StatusOK, gin.H{"status": "OK"})
}