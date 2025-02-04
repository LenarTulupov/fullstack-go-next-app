package middleware

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "strings"
    "api/pkg/services"
)

func AuthMiddleware(requiredRole string) gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
            c.Abort()
            return
        }

        token = strings.TrimPrefix(token, "Bearer ")

        userRole, err := services.ValidateToken(token)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }

        if userRole != requiredRole {
            c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient permissions"})
            c.Abort()
            return
        }

        c.Next()
    }
}
