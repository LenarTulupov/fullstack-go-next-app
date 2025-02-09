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
        // Извлечение токена из заголовка Authorization
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
            c.Abort()
            return
        }

        // Удаление префикса "Bearer " из токена
        token := strings.TrimPrefix(authHeader, "Bearer ")
        if token == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
            c.Abort()
            return
        }

        // Валидация токена
        userRole, err := services.ValidateToken(token)
        if err != nil {
            log.Printf("Token validation failed: %v", err) // Логирование ошибки
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token", "details": err.Error()})
            c.Abort()
            return
        }

        // Проверка роли пользователя
        if userRole != requiredRole {
            c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient permissions"})
            c.Abort()
            return
        }

        // Передача роли в контекст
        c.Set("user", gin.H{
            "role": userRole,
        })

        // Передача управления следующему обработчику
        c.Next()
    }
}
