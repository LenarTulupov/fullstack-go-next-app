package handlers

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "api/pkg/config"
)

func HealthCheckHandler(c *gin.Context) {
    if err := config.DB.Ping(); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"status": "failed", "error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"status": "ok"})
}