package middleware

import (
	"fmt"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	fmt.Println("CORS middleware applied")

	config := cors.Config{
		AllowOrigins: []string{
			"https://frontend-ouox.onrender.com",
			"http://localhost:3000",
			"https://frontend-five-inky-90.vercel.app",
			"https://bloom-lemon.vercel.app",
		},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Accept",
			"Authorization",
		},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	corsMiddleware := cors.New(config)

	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		fmt.Printf("CORS request from origin: %s\n", origin)

		// Обрабатываем preflight-запрос
		if c.Request.Method == "OPTIONS" {
			c.Header("Access-Control-Allow-Origin", origin)
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
			c.Header("Access-Control-Allow-Credentials", "true")
			c.AbortWithStatus(204)
			return
		}

		corsMiddleware(c)
	}
}
