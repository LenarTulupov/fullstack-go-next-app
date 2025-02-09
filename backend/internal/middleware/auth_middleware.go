package middleware

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "strings"
    "api/pkg/services"
    "log"
)

func AuthMiddleware(requiredRole string) gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
            c.Abort()
            return
        }

        token := strings.TrimPrefix(authHeader, "Bearer ")
        if token == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
            c.Abort()
            return
        }

        userRole, username, err := services.ValidateToken(token)
        if err != nil {
            log.Printf("Token validation failed: %v", err)
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token", "details": err.Error()})
            c.Abort()
            return
        }

        if userRole != requiredRole {
            c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient permissions"})
            c.Abort()
            return
        }

        c.Set("user", gin.H{
            "username": username, // Здесь username вместо name
            "role": userRole,
        })

        c.Next()
    }
}

