package middleware

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"api/pkg/handlers"       // Импортируем пакет с ResponseError
	"api/pkg/models/errors"   // Импортируем пакет с кастомными ошибками
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Настройка CORS
		config := cors.Config{
			AllowOrigins:     []string{"https://fullstack-go-next-app-4.onrender.com"},
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge:           12 * time.Hour,
		}

		// Используем встроенную CORS middleware
		corsMiddleware := cors.New(config)
		corsMiddleware(c)

		// Допустим, если происходит ошибка в CORS, мы её обрабатываем
		err := c.Errors.Last()
		if err != nil {
			handlers.ResponseError(errors.NewErrorController(http.StatusBadRequest, "CORS Error"), c.Writer)
			c.AbortWithStatus(http.StatusBadRequest) // Прерываем обработку запроса
			return
		}

		c.Next() // Продолжаем выполнение остальных middleware или хэндлеров
	}
}
