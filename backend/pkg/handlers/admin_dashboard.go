package handlers

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func AdminDashboard(c *gin.Context) {
    // Получаем информацию о пользователе из контекста
    user, exists := c.Get("user")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
        return
    }

    userData := user.(gin.H) // Преобразуем в структуру gin.H для дальнейшей работы
    username := userData["name"].(string) // Извлекаем имя пользователя

    // Выводим приветственное сообщение с именем администратора
    c.JSON(http.StatusOK, gin.H{
        "message": "Welcome to the Admin Dashboard",
        "username": username,
    })
}
