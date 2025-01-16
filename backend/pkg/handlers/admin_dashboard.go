package handlers

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func AdminDashboard(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"message": "Welcome to the Admin Dashboard"})
}
