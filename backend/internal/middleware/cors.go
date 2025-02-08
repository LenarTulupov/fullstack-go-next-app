package middleware

import (
	"time"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	fmt.Println("CORS middleware applied")

	config := cors.Config{
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	allowedOrigins := []string{
		"https://frontend-ouox.onrender.com",
		"http://localhost:3000",
		"https://frontend-five-inky-90.vercel.app",
		"https://bloom-lemon.vercel.app",
	}

	config.AllowOrigins = allowedOrigins

	return cors.New(config)
}
