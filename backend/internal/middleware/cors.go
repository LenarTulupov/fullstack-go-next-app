package middleware

import (
	"time"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	fmt.Println("CORS middleware applied")

	// Настройки CORS
	config := cors.Config{
		// Разрешенные домены
		AllowOrigins: []string{
			"https://frontend-ouox.onrender.com",
			"http://localhost:3000",
			"https://frontend-five-inky-90.vercel.app",
			"https://bloom-lemon.vercel.app",
		},
		// Разрешенные HTTP-методы
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		// Разрешенные заголовки
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Accept",
			"Authorization", // Добавлен заголовок Authorization
		},
		// Заголовки, которые могут быть доступны клиенту
		ExposeHeaders: []string{"Content-Length"},
		// Разрешение передачи кук и авторизационных данных
		AllowCredentials: true,
		// Время кэширования предварительных запросов (preflight)
		MaxAge: 12 * time.Hour,
	}

	// Логирование для отладки
	return func(c *gin.Context) {
		fmt.Printf("CORS request from origin: %s\n", c.Request.Header.Get("Origin"))
		cors.New(config)(c)
	}
}