package handlers

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func AdminDashboard(c *gin.Context) {
    user, exists := c.Get("user")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
        return
    }

    userData := user.(gin.H)
    role := userData["role"].(string) 

    c.JSON(http.StatusOK, gin.H{
        "message": "Welcome to the Admin Dashboard",
        "username": role,
    })
}
